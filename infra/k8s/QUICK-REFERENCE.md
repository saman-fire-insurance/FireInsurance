# Kubernetes Deployment - Quick Reference

## Container Registry Setup

**TODO: Replace REGISTRY_PLACEHOLDER in these files:**
1. `infra/k8s/overlays/stage/kustomization.yaml`
2. `infra/k8s/overlays/prod/kustomization.yaml`
3. `infra/k8s/overlays/preview/kustomization.yaml`

**Example:**
```yaml
# Replace:
newName: REGISTRY_PLACEHOLDER/backend

# With (if using GHCR):
newName: ghcr.io/your-org/fireinsurance/backend
```

## Vault Secrets Structure

```
secret/data/fireinsurance/
├── registry/                         # Container registry credentials
│   ├── username                      # noyanregistry
│   └── password                      # ArvanCloud registry password
├── stage/
│   ├── kubeconfig                    # Base64-encoded stage kubeconfig
│   ├── database_connection_string
│   ├── jwt_signing_key
│   ├── sms_provider_base_url
│   ├── sms_provider_username
│   ├── sms_provider_password
│   ├── saman_services_base_url
│   ├── saman_services_key
│   ├── nextauth_secret
│   └── recaptcha_site_key
├── prod/
│   ├── kubeconfig                    # Base64-encoded prod kubeconfig
│   └── (same application secrets as stage)
└── preview/
    ├── kubeconfig                    # Base64-encoded preview kubeconfig
    └── (same application secrets as stage)
```

## Deployment Triggers

| Environment | Trigger | Workflow |
|------------|---------|----------|
| **Stage** | After build completes (on `main`/`master`) | `deploy-stage.yml` |
| **Production** | After build completes (on release) OR manual | `deploy-prod.yml` |
| **Preview** | After build completes (on PR) | `deploy-pr-preview.yml` |

**Note:** All deployments wait for the "Build and Push Docker Images" workflow to complete successfully first. This ensures images are built before attempting deployment.

## GitOps: Viewing Deployment History

```bash
# View deployment history for stage
git log --oneline --grep="chore(k8s): deploy stage" -- infra/k8s/overlays/stage/kustomization.yaml

# View deployment history for production
git log --oneline --grep="chore(k8s): deploy production" -- infra/k8s/overlays/prod/kustomization.yaml

# View deployment history for PR previews
git log --oneline --grep="chore(k8s): deploy preview" -- infra/k8s/overlays/preview/kustomization.yaml

# See full details of a deployment
git show <commit-hash>

# See what's currently deployed in each environment
cat infra/k8s/overlays/stage/kustomization.yaml | grep newTag
cat infra/k8s/overlays/prod/kustomization.yaml | grep newTag
```

## Common kubectl Commands

```bash
# List all FireInsurance namespaces
kubectl get namespaces | grep fireinsurance

# Check stage environment
kubectl get all -n fireinsurance-stage
kubectl get pods -n fireinsurance-stage
kubectl logs -f deployment/backend -n fireinsurance-stage

# Check production environment
kubectl get all -n fireinsurance-prod
kubectl logs -f deployment/frontend -n fireinsurance-prod

# Check specific PR preview (replace 123 with PR number)
kubectl get all -n fireinsurance-pr-123

# Port forward for local testing
kubectl port-forward -n fireinsurance-stage svc/backend 8080:80
kubectl port-forward -n fireinsurance-stage svc/frontend 3000:80

# Restart deployments (to pick up new secrets)
kubectl rollout restart deployment/backend -n fireinsurance-stage
kubectl rollout restart deployment/frontend -n fireinsurance-stage

# Scale deployments
kubectl scale deployment backend --replicas=5 -n fireinsurance-prod

# View deployment history
kubectl rollout history deployment/backend -n fireinsurance-stage

# Rollback deployment
kubectl rollout undo deployment/backend -n fireinsurance-stage
```

## Manual Deployment Steps

### Quick Deploy to Stage
```bash
cd infra/k8s/overlays/stage
kustomize edit set image backend=<registry>/backend:<tag>
kustomize edit set image frontend=<registry>/frontend:<tag>
kustomize build . | kubectl apply -f -
kubectl rollout status deployment/backend -n fireinsurance-stage
kubectl rollout status deployment/frontend -n fireinsurance-stage
```

### Quick Deploy to Production
```bash
cd infra/k8s/overlays/prod
kustomize edit set image backend=<registry>/backend:<tag>
kustomize edit set image frontend=<registry>/frontend:<tag>
kustomize build . | kubectl apply -f -
kubectl rollout status deployment/backend -n fireinsurance-prod
kubectl rollout status deployment/frontend -n fireinsurance-prod
```

## GitHub Actions Workflows

### Manually Trigger Workflows

1. **Deploy to Production:**
   - Go to: Actions → "Deploy to Production" → "Run workflow"
   - Input: Image tag (e.g., `v1.0.0` or `main-abc1234`)

2. **Deploy to Stage:**
   - Go to: Actions → "Deploy to Stage" → "Run workflow"

3. **Build Images:**
   - Go to: Actions → "Build and Push Docker Images" → "Run workflow"

## Troubleshooting Quick Checks

```bash
# Check if secrets exist
kubectl get secrets -n fireinsurance-stage

# View secret (base64 encoded)
kubectl get secret backend-secrets -n fireinsurance-stage -o yaml

# Check pod events
kubectl describe pod <pod-name> -n fireinsurance-stage

# Check pod logs (previous container if crashed)
kubectl logs <pod-name> -n fireinsurance-stage --previous

# Check resource usage
kubectl top pods -n fireinsurance-stage
kubectl top nodes

# Test database connection from pod
kubectl exec -it <backend-pod> -n fireinsurance-stage -- sh
# Inside pod: test connection
```

## Image Tags Reference

| Event | Image Tag Format | Example |
|-------|-----------------|---------|
| Push to main | `main-<short-sha>` | `main-abc1234` |
| Pull Request | `pr-<number>-<short-sha>` | `pr-123-abc1234` |
| Release | `<tag-name>` | `v1.0.0` |

## Resource Limits (MVP Settings)

### Stage
- Backend: 256Mi-512Mi RAM, 100m-500m CPU, 2 replicas
- Frontend: 128Mi-256Mi RAM, 50m-200m CPU, 2 replicas

### Production
- Backend: 512Mi-1Gi RAM, 200m-1000m CPU, 3 replicas
- Frontend: 256Mi-512Mi RAM, 100m-500m CPU, 3 replicas

### Preview
- Backend: 256Mi-512Mi RAM, 100m-500m CPU, 1 replica
- Frontend: 128Mi-256Mi RAM, 50m-200m CPU, 1 replica

## Health Checks

Both backend and frontend have:
- **Liveness Probe**: Ensures container is running
- **Readiness Probe**: Ensures container is ready to receive traffic

Backend health endpoint: `GET /health`
Frontend health endpoint: `GET /`

## Next Steps After Setup

1. ✅ Configure container registry
2. ✅ Store kubeconfig in Vault
3. ✅ Store all secrets in Vault
4. ✅ Create GitHub environments (stage, production)
5. ✅ Update registry URLs in kustomization files
6. ✅ Test image build workflow
7. ✅ Test stage deployment
8. ✅ Test PR preview
9. ✅ Configure production deployment protection
10. ✅ Set up monitoring (Prometheus/Grafana)
11. ✅ Configure autoscaling (HPA)
12. ✅ Set up alerting

## Important Notes

- **Never commit secrets** to Git
- **Always test in stage** before production
- **Use PR previews** for feature testing
- **Monitor resource usage** and adjust limits
- **Tag releases** for production deployments
- **Database is external** - not managed by these manifests
- **Domains/Ingress** configured via ArvanCloud dashboard
