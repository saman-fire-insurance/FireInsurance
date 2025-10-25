# Kubernetes Deployment Setup Guide

This guide will help you set up the complete CI/CD pipeline for deploying FireInsurance to ArvanCloud Kubernetes.

## Quick Start Checklist

- [ ] Container registry configured
- [ ] Kubeconfig stored in Vault
- [ ] All secrets stored in Vault
- [ ] GitHub environments created
- [ ] Workflows updated with registry URL
- [ ] First deployment tested

## Step 1: Configure Container Registry

### Option A: GitHub Container Registry (Recommended)
1. Enable GitHub Container Registry for your repository
2. The workflows are already configured for GHCR
3. Images will be pushed to `ghcr.io/<owner>/<repo>/backend` and `ghcr.io/<owner>/<repo>/frontend`

### Option B: Custom Registry
1. Update the `REGISTRY` environment variable in all workflow files:
   - `.github/workflows/build-and-push.yml`
   - `.github/workflows/deploy-stage.yml`
   - `.github/workflows/deploy-prod.yml`
   - `.github/workflows/deploy-pr-preview.yml`

2. If using a private registry, add authentication to Vault or GitHub Secrets

## Step 2: Prepare Kubeconfigs

You need separate kubeconfig files for each environment (stage, prod, preview) for better security isolation.

1. Get your kubeconfig files from ArvanCloud:
   ```bash
   # Download from ArvanCloud dashboard or get via CLI
   # Create separate kubeconfig for each environment with appropriate permissions
   # stage-kubeconfig.yaml
   # prod-kubeconfig.yaml
   # preview-kubeconfig.yaml
   ```

2. Store in Vault:
   ```bash
   # Encode the kubeconfigs
   cat stage-kubeconfig.yaml | base64 -w 0
   cat prod-kubeconfig.yaml | base64 -w 0
   cat preview-kubeconfig.yaml | base64 -w 0

   # Store in Vault (using Vault CLI)
   vault kv put secret/fireinsurance/stage \
     kubeconfig="<base64-encoded-stage-kubeconfig>"

   vault kv put secret/fireinsurance/prod \
     kubeconfig="<base64-encoded-prod-kubeconfig>"

   vault kv put secret/fireinsurance/preview \
     kubeconfig="<base64-encoded-preview-kubeconfig>"
   ```

   Or use Vault UI:
   - Stage: `secret/data/fireinsurance/stage` → Key: `kubeconfig` → Value: `<base64-encoded-stage-kubeconfig>`
   - Prod: `secret/data/fireinsurance/prod` → Key: `kubeconfig` → Value: `<base64-encoded-prod-kubeconfig>`
   - Preview: `secret/data/fireinsurance/preview` → Key: `kubeconfig` → Value: `<base64-encoded-preview-kubeconfig>`

## Step 3: Store Application Secrets in Vault

### Stage Environment
```bash
vault kv put secret/fireinsurance/stage \
  database_connection_string="Host=<db-host>;Port=5432;Database=fireinsurance_stage;Username=<user>;Password=<pass>" \
  jwt_signing_key="<generate-random-256-bit-key>" \
  sms_provider_base_url="https://Webservice.zobdeh.org" \
  sms_provider_username="<username>" \
  sms_provider_password="<password>" \
  saman_services_base_url="https://eeadminpanel.si24.ir" \
  saman_services_key="<api-key>" \
  nextauth_secret="<generate-random-string>" \
  recaptcha_site_key="<google-recaptcha-site-key>"
```

### Production Environment
```bash
vault kv put secret/fireinsurance/prod \
  database_connection_string="Host=<db-host>;Port=5432;Database=fireinsurance_prod;Username=<user>;Password=<pass>" \
  jwt_signing_key="<generate-random-256-bit-key>" \
  sms_provider_base_url="https://Webservice.zobdeh.org" \
  sms_provider_username="<username>" \
  sms_provider_password="<password>" \
  saman_services_base_url="https://eeadminpanel.si24.ir" \
  saman_services_key="<api-key>" \
  nextauth_secret="<generate-random-string>" \
  recaptcha_site_key="<google-recaptcha-site-key>"
```

### Preview Environment
```bash
vault kv put secret/fireinsurance/preview \
  database_connection_string="Host=<db-host>;Port=5432;Database=fireinsurance_preview;Username=<user>;Password=<pass>" \
  jwt_signing_key="<generate-random-256-bit-key>" \
  sms_provider_base_url="https://Webservice.zobdeh.org" \
  sms_provider_username="<username>" \
  sms_provider_password="<password>" \
  saman_services_base_url="https://eeadminpanel.si24.ir" \
  saman_services_key="<api-key>" \
  nextauth_secret="<generate-random-string>" \
  recaptcha_site_key="<google-recaptcha-site-key>"
```

### Generating Secrets
```bash
# Generate JWT signing key (256-bit)
openssl rand -base64 32

# Generate NextAuth secret
openssl rand -base64 32
```

## Step 4: Configure GitHub Repository

### GitOps Approach

This setup uses **GitOps methodology** - all deployment changes are committed back to git:

**How it works:**
- Workflows update kustomization files with exact image tags
- Changes are automatically committed to the repository
- Git history provides full audit trail of all deployments
- Easy rollback: just revert a commit and re-run the workflow

**Permissions Required:**
The workflows need `contents: write` permission to commit changes. This is already configured in the workflow files.

**What gets committed:**
- `infra/k8s/overlays/stage/kustomization.yaml` (stage deployments)
- `infra/k8s/overlays/prod/kustomization.yaml` (production deployments)
- `infra/k8s/overlays/preview/kustomization.yaml` (PR preview deployments)

**Commit messages include:**
- Image tags deployed
- Environment details
- Who triggered the deployment
- Link to workflow run

### Create GitHub Environments
1. Go to your repository **Settings** → **Environments**
2. Create two environments:
   - `stage`
   - `production`

3. For production environment, configure protection rules:
   - ✅ Required reviewers (add team members)
   - ✅ Wait timer (optional, e.g., 5 minutes)
   - ✅ Deployment branches (only `main`/`master`)

### Verify Workflow Permissions
1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", ensure:
   - ✅ "Read and write permissions" is selected
   - OR the workflows have explicit `contents: write` permission (already configured)

### Verify Vault Integration
The workflows use the existing Vault setup. Verify it works:
```bash
# This should already be working based on vault-test.yml
# Test by running the vault-test workflow
```

## Step 5: Update Workflow Files

Replace `REGISTRY_PLACEHOLDER` with your actual registry in:

1. **`infra/k8s/overlays/stage/kustomization.yaml`**
   ```yaml
   images:
     - name: backend
       newName: ghcr.io/<owner>/<repo>/backend  # Update this
   ```

2. **`infra/k8s/overlays/prod/kustomization.yaml`**
   ```yaml
   images:
     - name: backend
       newName: ghcr.io/<owner>/<repo>/backend  # Update this
   ```

3. **`infra/k8s/overlays/preview/kustomization.yaml`**
   ```yaml
   images:
     - name: backend
       newName: ghcr.io/<owner>/<repo>/backend  # Update this
   ```

## Step 6: Test the Setup

### 1. Test Image Build
```bash
# Push to a branch or create a PR
git checkout -b test/k8s-setup
git add .
git commit -m "feat: add kubernetes deployment"
git push origin test/k8s-setup

# Check GitHub Actions → "Build and Push Docker Images"
# Verify images are pushed to registry
```

### 2. Test Stage Deployment
```bash
# Merge to main/master
# This will trigger automatic deployment to stage

# Monitor the workflow:
# GitHub Actions → "Deploy to Stage"

# Verify deployment
kubectl get all -n fireinsurance-stage
```

### 3. Test PR Preview
```bash
# Create a pull request
# Should automatically deploy a preview environment

# Check namespace created
kubectl get namespaces | grep fireinsurance-pr

# Check PR comments for deployment details
```

### 4. Test Production Deployment
```bash
# Create a release
git tag v1.0.0
git push origin v1.0.0

# Or manually trigger workflow:
# GitHub Actions → "Deploy to Production" → Run workflow

# Verify deployment
kubectl get all -n fireinsurance-prod
```

## Step 7: Configure ArvanCloud (Optional)

### Set up Load Balancer / Ingress
If you need external access to your services:

1. **Via ArvanCloud Dashboard:**
   - Navigate to your cluster
   - Create Load Balancer or Ingress resource
   - Point to your services in each namespace

2. **Via Kubernetes Ingress (if supported):**
   Create an ingress manifest in each overlay:
   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: fireinsurance-ingress
     annotations:
       # ArvanCloud specific annotations (if any)
   spec:
     rules:
     - host: stage.fireinsurance.example.com
       http:
         paths:
         - path: /api
           pathType: Prefix
           backend:
             service:
               name: backend
               port:
                 number: 80
         - path: /
           pathType: Prefix
           backend:
             service:
               name: frontend
               port:
                 number: 80
   ```

## Verification

After setup, verify everything works:

```bash
# 1. Check all namespaces
kubectl get namespaces | grep fireinsurance

# 2. Check stage deployment
kubectl get all -n fireinsurance-stage

# 3. Check pod logs
kubectl logs -f deployment/backend -n fireinsurance-stage

# 4. Test backend health endpoint
kubectl port-forward -n fireinsurance-stage svc/backend 8080:80
curl http://localhost:8080/health

# 5. Test frontend
kubectl port-forward -n fireinsurance-stage svc/frontend 3000:80
curl http://localhost:3000
```

## Troubleshooting

### Workflow fails at "Configure kubectl"
- Verify kubeconfig is correctly stored in Vault
- Check if kubeconfig is base64 encoded
- Ensure Vault role `github-actions` has access to the path

### Workflow fails at "Deploy to Kubernetes"
- Check if namespace exists
- Verify secrets are created correctly
- Check image names and tags are correct
- Review kubectl error messages in workflow logs

### Pods in CrashLoopBackOff
- Check pod logs: `kubectl logs <pod-name> -n <namespace>`
- Verify environment variables are set correctly
- Check database connection string
- Ensure all required secrets exist

### Images not found
- Verify images were built and pushed successfully
- Check registry authentication
- Ensure image names match in kustomization.yaml

## Next Steps

1. **Set up monitoring**: Add Prometheus and Grafana
2. **Configure backups**: Set up database backup strategy
3. **Add autoscaling**: Implement HPA for production
4. **Set up alerts**: Configure alerting for critical issues
5. **Document runbooks**: Create operational procedures
6. **Load testing**: Test system under load
7. **Disaster recovery**: Document and test recovery procedures

## Support

For issues specific to:
- **ArvanCloud**: Contact ArvanCloud support or check documentation
- **GitHub Actions**: Check workflow logs and GitHub Actions documentation
- **Kubernetes**: Review Kubernetes documentation and logs
- **Vault**: Check Vault logs and authentication setup
