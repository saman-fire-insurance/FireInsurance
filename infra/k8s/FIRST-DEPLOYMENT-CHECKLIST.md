# First Deployment Checklist

Use this checklist for your first deployment to Kubernetes.

## Pre-Deployment Setup

### 1. Container Registry Configuration
- [ ] Decide on container registry (GHCR, Docker Hub, etc.)
- [ ] Create registry if needed
- [ ] Configure registry authentication (if private)
- [ ] Update `REGISTRY` in all workflow files:
  - [ ] `.github/workflows/build-and-push.yml`
  - [ ] `.github/workflows/deploy-stage.yml`
  - [ ] `.github/workflows/deploy-prod.yml`
  - [ ] `.github/workflows/deploy-pr-preview.yml`
- [ ] Update image names in Kustomize overlays:
  - [ ] `infra/k8s/overlays/stage/kustomization.yaml`
  - [ ] `infra/k8s/overlays/prod/kustomization.yaml`
  - [ ] `infra/k8s/overlays/preview/kustomization.yaml`

**Registry URL Format:**
```
# GitHub Container Registry
ghcr.io/<owner>/<repo>/backend
ghcr.io/<owner>/<repo>/frontend

# Docker Hub
docker.io/<username>/fireinsurance-backend
docker.io/<username>/fireinsurance-frontend
```

### 2. ArvanCloud Kubernetes Setup
- [ ] Create Kubernetes cluster in ArvanCloud
- [ ] Download kubeconfig file
- [ ] Test local kubectl connection:
  ```bash
  export KUBECONFIG=/path/to/kubeconfig
  kubectl cluster-info
  kubectl get nodes
  ```
- [ ] Base64 encode kubeconfig:
  ```bash
  cat /path/to/kubeconfig | base64 -w 0
  ```
- [ ] Store encoded kubeconfig in Vault

### 3. Vault Configuration

#### Store Kubeconfig
- [ ] Path: `secret/data/fireinsurance/k8s`
- [ ] Key: `kubeconfig`
- [ ] Value: `<base64-encoded-kubeconfig>`

#### Generate Secrets
```bash
# Generate random secrets
JWT_KEY=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "JWT Signing Key: $JWT_KEY"
echo "NextAuth Secret: $NEXTAUTH_SECRET"
```

#### Store Stage Secrets
- [ ] Path: `secret/data/fireinsurance/stage`
- [ ] Keys:
  - [ ] `database_connection_string` = "Host=<host>;Port=5432;Database=fireinsurance_stage;Username=<user>;Password=<pass>"
  - [ ] `jwt_signing_key` = "<generated-jwt-key>"
  - [ ] `sms_provider_base_url` = "https://Webservice.zobdeh.org"
  - [ ] `sms_provider_username` = "<your-username>"
  - [ ] `sms_provider_password` = "<your-password>"
  - [ ] `saman_services_base_url` = "https://eeadminpanel.si24.ir"
  - [ ] `saman_services_key` = "<your-api-key>"
  - [ ] `nextauth_secret` = "<generated-nextauth-secret>"
  - [ ] `recaptcha_site_key` = "<google-recaptcha-site-key>"

#### Store Production Secrets
- [ ] Path: `secret/data/fireinsurance/prod`
- [ ] Keys: (same as stage, with production values)
  - [ ] `database_connection_string`
  - [ ] `jwt_signing_key`
  - [ ] `sms_provider_base_url`
  - [ ] `sms_provider_username`
  - [ ] `sms_provider_password`
  - [ ] `saman_services_base_url`
  - [ ] `saman_services_key`
  - [ ] `nextauth_secret`
  - [ ] `recaptcha_site_key`

#### Store Preview Secrets
- [ ] Path: `secret/data/fireinsurance/preview`
- [ ] Keys: (same as stage, can use stage values for preview)
  - [ ] All keys listed above

### 4. GitHub Repository Configuration

#### Create Environments
- [ ] Go to: Settings → Environments → New environment
- [ ] Create `stage` environment
- [ ] Create `production` environment

#### Configure Production Protection (Recommended)
- [ ] Go to: Settings → Environments → production
- [ ] Enable "Required reviewers"
- [ ] Add team members as reviewers
- [ ] (Optional) Set wait timer
- [ ] Set deployment branches to `main` or `master` only

#### Verify Vault Integration
- [ ] Workflow exists: `.github/workflows/vault-test.yml`
- [ ] Run workflow: Actions → "Vault Integration Test" → Run workflow
- [ ] Check that it successfully retrieves secrets

### 5. Database Setup
- [ ] Create stage database (external)
- [ ] Create production database (external)
- [ ] Create preview database (external, can be shared)
- [ ] Run initial migrations if needed
- [ ] Verify connection strings in Vault are correct

## First Deployment

### Phase 1: Build Images
- [ ] Commit and push changes to a feature branch
- [ ] Create a pull request
- [ ] Verify workflow runs: "Build and Push Docker Images"
- [ ] Check GitHub Packages/Registry for new images
- [ ] Verify both backend and frontend images are built
- [ ] Note the image tags (e.g., `pr-1-abc1234`)

### Phase 2: Test PR Preview Environment
- [ ] PR should trigger: "Deploy PR Preview"
- [ ] Wait for deployment to complete
- [ ] Check workflow logs for any errors
- [ ] Verify namespace created:
  ```bash
  kubectl get namespaces | grep fireinsurance-pr
  ```
- [ ] Check pods are running:
  ```bash
  kubectl get pods -n fireinsurance-pr-<number>
  ```
- [ ] Check services:
  ```bash
  kubectl get svc -n fireinsurance-pr-<number>
  ```
- [ ] View backend logs:
  ```bash
  kubectl logs -f deployment/backend -n fireinsurance-pr-<number>
  ```
- [ ] View frontend logs:
  ```bash
  kubectl logs -f deployment/frontend -n fireinsurance-pr-<number>
  ```
- [ ] Test backend health (port-forward):
  ```bash
  kubectl port-forward -n fireinsurance-pr-<number> svc/backend 8080:80
  curl http://localhost:8080/health
  ```
- [ ] Test frontend (port-forward):
  ```bash
  kubectl port-forward -n fireinsurance-pr-<number> svc/frontend 3000:80
  curl http://localhost:3000
  ```
- [ ] Close PR and verify cleanup:
  ```bash
  # Namespace should be deleted after PR is closed
  kubectl get namespaces | grep fireinsurance-pr
  ```

### Phase 3: Deploy to Stage
- [ ] Merge PR to `main`/`master`
- [ ] Verify workflow runs: "Build and Push Docker Images"
- [ ] Verify workflow runs: "Deploy to Stage"
- [ ] Check workflow logs for errors
- [ ] Verify namespace exists:
  ```bash
  kubectl get namespace fireinsurance-stage
  ```
- [ ] Check deployments:
  ```bash
  kubectl get deployments -n fireinsurance-stage
  ```
- [ ] Check pods (should be 2 replicas each):
  ```bash
  kubectl get pods -n fireinsurance-stage
  ```
- [ ] Verify pods are running and ready
- [ ] Check services:
  ```bash
  kubectl get svc -n fireinsurance-stage
  ```
- [ ] View backend logs:
  ```bash
  kubectl logs -f deployment/backend -n fireinsurance-stage
  ```
- [ ] View frontend logs:
  ```bash
  kubectl logs -f deployment/frontend -n fireinsurance-stage
  ```
- [ ] Test backend health:
  ```bash
  kubectl port-forward -n fireinsurance-stage svc/backend 8080:80
  curl http://localhost:8080/health
  ```
- [ ] Test frontend:
  ```bash
  kubectl port-forward -n fireinsurance-stage svc/frontend 3000:80
  curl http://localhost:3000
  ```
- [ ] Check resource usage:
  ```bash
  kubectl top pods -n fireinsurance-stage
  ```

### Phase 4: Deploy to Production
- [ ] Create a Git tag for release:
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```
- [ ] Or manually trigger workflow: Actions → "Deploy to Production"
- [ ] (If protection enabled) Approve deployment in GitHub
- [ ] Verify workflow runs: "Deploy to Production"
- [ ] Check workflow logs for errors
- [ ] Verify namespace exists:
  ```bash
  kubectl get namespace fireinsurance-prod
  ```
- [ ] Check deployments:
  ```bash
  kubectl get deployments -n fireinsurance-prod
  ```
- [ ] Check pods (should be 3 replicas each):
  ```bash
  kubectl get pods -n fireinsurance-prod
  ```
- [ ] Verify all pods are running and ready
- [ ] Check services:
  ```bash
  kubectl get svc -n fireinsurance-prod
  ```
- [ ] View logs for any errors
- [ ] Test backend health
- [ ] Test frontend
- [ ] Perform smoke tests

## Post-Deployment Verification

### Health Checks
- [ ] Backend health endpoint responding
- [ ] Frontend loading correctly
- [ ] Database connections working
- [ ] JWT authentication working
- [ ] SMS provider integration working
- [ ] reCAPTCHA working

### Monitoring
- [ ] Set up log aggregation
- [ ] Configure metrics collection
- [ ] Set up alerting for:
  - [ ] Pod crashes
  - [ ] High resource usage
  - [ ] Failed health checks
  - [ ] High error rates

### ArvanCloud Configuration
- [ ] Configure load balancer (if needed)
- [ ] Set up DNS/domains
- [ ] Configure SSL certificates
- [ ] Set up ingress (if needed)

## Troubleshooting

If deployment fails, check:

1. **Workflow fails at "Retrieve secrets from Vault"**
   - [ ] Verify Vault is accessible
   - [ ] Check OIDC JWT authentication is configured
   - [ ] Verify secret paths are correct

2. **Workflow fails at "Configure kubectl"**
   - [ ] Verify kubeconfig in Vault is correct
   - [ ] Check kubeconfig is base64 encoded
   - [ ] Test kubeconfig locally

3. **Pods in Pending state**
   - [ ] Check node resources: `kubectl describe nodes`
   - [ ] Check pod events: `kubectl describe pod <pod-name> -n <namespace>`
   - [ ] Verify resource requests/limits

4. **Pods in CrashLoopBackOff**
   - [ ] Check logs: `kubectl logs <pod-name> -n <namespace>`
   - [ ] Verify environment variables
   - [ ] Check secrets are created correctly
   - [ ] Verify database connection

5. **Image pull errors**
   - [ ] Verify image exists in registry
   - [ ] Check image name and tag
   - [ ] Verify registry authentication

## Success Criteria

✅ **Deployment is successful when:**
- [ ] All pods are in Running state
- [ ] All pods pass readiness probes
- [ ] Health endpoints return 200 OK
- [ ] Backend can connect to database
- [ ] Frontend can communicate with backend
- [ ] Authentication flow works end-to-end
- [ ] No errors in pod logs
- [ ] Resource usage is within limits

## Next Steps After First Deployment

1. [ ] Set up monitoring and alerting
2. [ ] Configure autoscaling (HPA)
3. [ ] Implement backup strategy
4. [ ] Document runbooks
5. [ ] Perform load testing
6. [ ] Set up disaster recovery plan
7. [ ] Configure CI/CD notifications (Slack, email, etc.)
8. [ ] Review and optimize resource limits
9. [ ] Set up log aggregation (ELK, Loki, etc.)
10. [ ] Configure network policies (if needed)

## Notes

- **Keep this checklist updated** as you discover new steps or issues
- **Document any custom configurations** specific to your setup
- **Save successful commands** for future reference
- **Take notes** of any issues and resolutions for the team
