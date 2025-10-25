# Kubernetes Deployment with Kustomize

This directory contains Kubernetes manifests and Kustomize configurations for deploying the FireInsurance application to ArvanCloud (or any standard Kubernetes cluster).

## Structure

```
k8s/
├── base/                   # Base Kubernetes resources (environment-agnostic)
│   ├── backend/           # Backend API service
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── configmap.yaml
│   │   ├── secret.yaml
│   │   └── kustomization.yaml
│   └── frontend/          # Frontend Next.js app
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── configmap.yaml
│       ├── secret.yaml
│       └── kustomization.yaml
└── overlays/              # Environment-specific configurations
    ├── stage/             # Staging environment
    │   ├── kustomization.yaml
    │   └── namespace.yaml
    ├── prod/              # Production environment
    │   ├── kustomization.yaml
    │   └── namespace.yaml
    └── preview/           # PR preview environments
        └── kustomization.yaml
```

## Environments

### Stage
- **Namespace**: `fireinsurance-stage`
- **Replicas**: 2 (backend), 2 (frontend)
- **Trigger**: Automatically deployed on push to `main`/`master` branch
- **Resources**: Small MVP-sized resources

### Production
- **Namespace**: `fireinsurance-prod`
- **Replicas**: 3 (backend), 3 (frontend)
- **Trigger**: Deployed on release publication or manual workflow dispatch
- **Resources**: Medium-sized resources with higher limits

### Preview (PR Environments)
- **Namespace**: `fireinsurance-pr-<number>` (dynamic per PR)
- **Replicas**: 1 (backend), 1 (frontend)
- **Trigger**: Automatically deployed when PR is opened/updated
- **Cleanup**: Automatically deleted when PR is closed
- **Resources**: Minimal resources for testing

## Prerequisites

1. **Container Registry**: Configure your container registry in GitHub repository secrets or update the workflows
   - Default is set to GitHub Container Registry (`ghcr.io`)
   - Update `REGISTRY` environment variable in workflows if using a different registry

2. **Vault Secrets**: Store the following secrets in HashiCorp Vault:

   **Container Registry Credentials:**
   ```
   secret/data/fireinsurance/registry
   ├── username                      # noyanregistry
   └── password                      # ArvanCloud registry password
   ```

   **Stage Environment (includes kubeconfig):**
   ```
   secret/data/fireinsurance/stage
   ├── kubeconfig                    # Base64-encoded stage kubeconfig
   ├── database_connection_string
   ├── jwt_signing_key
   ├── sms_provider_base_url
   ├── sms_provider_username
   ├── sms_provider_password
   ├── saman_services_base_url
   ├── saman_services_key
   ├── nextauth_secret
   └── recaptcha_site_key
   ```

   **Production Environment (includes kubeconfig):**
   ```
   secret/data/fireinsurance/prod
   ├── kubeconfig                    # Base64-encoded prod kubeconfig
   └── (same application secrets as stage)
   ```

   **Preview Environment (includes kubeconfig):**
   ```
   secret/data/fireinsurance/preview
   ├── kubeconfig                    # Base64-encoded preview kubeconfig
   └── (same application secrets as stage)
   ```

   **Note:** Each environment has its own kubeconfig for better security isolation.

3. **GitHub Environments**: Configure the following environments in your GitHub repository:
   - `stage` - For staging deployments
   - `production` - For production deployments (with protection rules recommended)

## GitOps Approach

This project uses a **GitOps methodology** where all deployment changes are tracked in git:

**How it works:**
1. Workflows update `kustomization.yaml` files with exact image tags
2. Changes are committed back to the repository
3. Git history provides a full audit trail of all deployments

**Benefits:**
- ✅ **Full audit trail**: Every deployment is tracked in git history
- ✅ **Easy rollback**: Just revert the commit to rollback a deployment
- ✅ **Clear visibility**: See what's currently deployed by looking at the kustomization files
- ✅ **GitOps best practice**: Infrastructure as Code with version control

**Commit messages include:**
- Image tags deployed
- Environment (stage/prod/preview)
- Who triggered the deployment
- Link to the workflow run

**Example commit:**
```
chore(k8s): deploy stage - backend:main-abc1234, frontend:main-abc1234

Deployed images:
- Backend: registry.example.com/backend:main-abc1234
- Frontend: registry.example.com/frontend:main-abc1234

Triggered by: username
Workflow: Deploy to Stage
Run: https://github.com/owner/repo/actions/runs/12345
```

## GitHub Actions Workflows

### Workflow Orchestration

The CI/CD pipeline uses **workflow dependencies** to ensure deployments happen only after successful builds:

```
┌─────────────────────────────────┐
│ Build and Push Docker Images   │
│ (Triggered on push/PR/release)  │
└────────────┬────────────────────┘
             │
             ├─── (on main/master) ──→ Deploy to Stage
             │
             ├─── (on release) ─────→ Deploy to Production
             │
             └─── (on PR) ──────────→ Deploy PR Preview
```

**Key Benefits:**
- ✅ Deployments only run after successful builds
- ✅ Prevents deploying non-existent images
- ✅ Ensures image tags match what was built
- ✅ Failed builds don't trigger deployments

### 1. Build and Push (`build-and-push.yml`)
Builds Docker images for both backend and frontend and pushes them to the container registry.

**Triggers:**
- Push to `main`/`master`
- Pull requests
- Release publication
- Manual dispatch

**Images Built:**
- Backend: `<registry>/<repo>/backend:<tag>`
- Frontend: `<registry>/<repo>/frontend:<tag>`

**What Happens Next:**
- On `main`/`master`: Triggers "Deploy to Stage"
- On release: Triggers "Deploy to Production"
- On PR: Triggers "Deploy PR Preview"

### 2. Deploy to Stage (`deploy-stage.yml`)
Deploys the latest images to the staging environment.

**Triggers:**
- **After** "Build and Push Docker Images" workflow completes successfully on `main`/`master`
- Manual dispatch (with service selection options)

**Workflow Dependencies:**
- Waits for build workflow to complete successfully before deploying
- Ensures images are built before attempting deployment
- Uses exact image tags from the build

**Service Selection:**
When manually triggered, you can choose which services to deploy:
- Deploy backend only
- Deploy frontend only
- Deploy both services (default for automatic triggers)

**Steps:**
1. Retrieves secrets from Vault
2. Configures kubectl with kubeconfig from Vault
3. Updates Kustomize with new image tags
4. Commits kustomization changes to git (GitOps)
5. Creates/updates Kubernetes secrets
6. Applies manifests to the cluster (filtered by service selection)
7. Waits for rollout to complete (only for selected services)

### 3. Deploy to Production (`deploy-prod.yml`)
Deploys images to the production environment.

**Triggers:**
- **After** "Build and Push Docker Images" workflow completes successfully (when triggered by a release)
- Manual dispatch with image tag input and service selection

**Workflow Dependencies:**
- Automatically deploys after a release is published (build runs first, then deploy)
- Manual deployments allow specifying exact image tag
- Only deploys if build workflow succeeded

**Service Selection:**
When manually triggered, you can choose which services to deploy:
- Deploy backend only
- Deploy frontend only
- Deploy both services (default for automatic triggers)

**Features:**
- Requires manual approval (if GitHub environment protection is enabled)
- Supports deploying specific image tags
- Higher resource limits (3 replicas, more CPU/memory)
- Extended rollout timeout
- GitOps: commits deployment to git history

### 4. Deploy PR Preview (`deploy-pr-preview.yml`)
Creates ephemeral preview environments for pull requests.

**Triggers:**
- **After** "Build and Push Docker Images" workflow completes successfully for a PR

**Workflow Dependencies:**
- Waits for build workflow to complete successfully before deploying
- Automatically extracts PR number from workflow run
- Only deploys if images were successfully built

**Features:**
- Creates namespace: `fireinsurance-pr-<number>`
- Deploys with PR-specific image tags
- Comments on PR with deployment details
- Minimal resources for cost efficiency (1 replica each)
- GitOps: commits deployment to git history (on PR branch)

### 5. Cleanup PR Preview (`cleanup-pr-preview.yml`)
Removes preview environments when PRs are closed.

**Triggers:**
- PR closed (merged or not)

**Actions:**
- Deletes the entire namespace and all resources
- Comments on PR confirming cleanup

### 6. Deploy from Kustomization (`deploy-from-kustomization.yml`)
Deploys using existing image tags from kustomization files **without rebuilding**.

**Triggers:**
- Manual dispatch only

**Use Cases:**
- Rollback to a previous deployment (use tags from git history)
- Re-deploy after infrastructure changes (secrets, configmaps)
- Deploy to a different environment with the same images
- Restart deployments after cluster maintenance
- Deploy specific services independently without rebuilding

**Inputs:**
- **Environment**: Choose `stage` or `prod`
- **Deploy Backend**: Boolean (deploy backend service)
- **Deploy Frontend**: Boolean (deploy frontend service)
- **Reason**: Optional description for audit trail

**How It Works:**
1. Reads current kustomization.yaml from the selected environment
2. Uses the exact image tags already defined in the file
3. Deploys only the selected services (backend, frontend, or both)
4. Does NOT build new images or update kustomization.yaml
5. Commits a deployment record to git with the reason provided

**Example Usage:**
```bash
# Scenario 1: Rollback production to a previous version
# 1. Find the commit with the desired image tags
git log --oneline --grep="chore(k8s): deploy production" -- infra/k8s/overlays/prod/kustomization.yaml

# 2. Revert to that commit
git revert <commit-hash> --no-commit
git commit -m "chore(k8s): rollback production to v1.2.3"
git push

# 3. Trigger workflow manually:
# - Environment: prod
# - Deploy Backend: true
# - Deploy Frontend: true
# - Reason: "Rollback to v1.2.3 due to issue in v1.2.4"

# Scenario 2: Update secrets without redeploying
# Trigger workflow to restart pods and pick up new secrets:
# - Environment: stage
# - Deploy Backend: true
# - Deploy Frontend: false
# - Reason: "Restart backend to pick up updated database credentials"

# Scenario 3: Deploy only frontend after configuration change
# - Environment: prod
# - Deploy Backend: false
# - Deploy Frontend: true
# - Reason: "Deploy frontend with updated CORS configuration"
```

## Manual Deployment

### Deploy to Stage
```bash
# Set your kubeconfig
export KUBECONFIG=/path/to/kubeconfig

# Navigate to stage overlay
cd infra/k8s/overlays/stage

# Update image tags
kustomize edit set image backend=<registry>/backend:<tag>
kustomize edit set image frontend=<registry>/frontend:<tag>

# Create namespace (if not exists)
kubectl create namespace fireinsurance-stage --dry-run=client -o yaml | kubectl apply -f -

# Create secrets manually (replace with actual values)
kubectl create secret generic backend-secrets \
  --from-literal=database-connection-string="..." \
  --from-literal=jwt-signing-key="..." \
  --namespace=fireinsurance-stage \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic frontend-secrets \
  --from-literal=nextauth-secret="..." \
  --from-literal=recaptcha-site-key="..." \
  --namespace=fireinsurance-stage \
  --dry-run=client -o yaml | kubectl apply -f -

# Apply manifests
kustomize build . | kubectl apply -f -

# Watch rollout
kubectl rollout status deployment/backend -n fireinsurance-stage
kubectl rollout status deployment/frontend -n fireinsurance-stage
```

### Verify Deployment
```bash
# Check pods
kubectl get pods -n fireinsurance-stage

# Check services
kubectl get svc -n fireinsurance-stage

# View logs
kubectl logs -f deployment/backend -n fireinsurance-stage
kubectl logs -f deployment/frontend -n fireinsurance-stage

# Check resource usage
kubectl top pods -n fireinsurance-stage
```

### View Deployment History (GitOps)
```bash
# View deployment history for stage environment
git log --oneline --grep="chore(k8s): deploy stage" -- infra/k8s/overlays/stage/kustomization.yaml

# View deployment history for production
git log --oneline --grep="chore(k8s): deploy production" -- infra/k8s/overlays/prod/kustomization.yaml

# View full details of a specific deployment
git show <commit-hash>

# See what's currently deployed
cat infra/k8s/overlays/stage/kustomization.yaml
cat infra/k8s/overlays/prod/kustomization.yaml
```

### Rollback Deployment

**Option 1: GitOps Rollback (Recommended)**
```bash
# Find the commit you want to rollback to
git log --oneline --grep="chore(k8s): deploy stage" -- infra/k8s/overlays/stage/kustomization.yaml

# Revert to that specific deployment
git revert <commit-hash>
git push

# Or manually edit the kustomization file and commit
cd infra/k8s/overlays/stage
# Edit kustomization.yaml to use previous image tags
git add kustomization.yaml
git commit -m "chore(k8s): rollback stage to <previous-tag>"
git push

# Re-run the deployment workflow manually to apply the rollback
```

**Option 2: Kubernetes Rollback**
```bash
# View rollout history
kubectl rollout history deployment/backend -n fireinsurance-stage

# Rollback to previous version
kubectl rollout undo deployment/backend -n fireinsurance-stage

# Rollback to specific revision
kubectl rollout undo deployment/backend --to-revision=2 -n fireinsurance-stage

# Note: This doesn't update git, so consider doing a GitOps rollback instead
```

## Configuration Updates

### Updating Secrets
Secrets are managed via Vault and automatically synced during deployment. To update:

1. Update the secret value in Vault
2. Trigger the deployment workflow (or manually update in K8s)
3. Restart deployments to pick up new values:
   ```bash
   kubectl rollout restart deployment/backend -n <namespace>
   kubectl rollout restart deployment/frontend -n <namespace>
   ```

### Updating ConfigMaps
ConfigMaps are defined in the Kustomize overlays. To update:

1. Edit the `kustomization.yaml` in the appropriate overlay
2. Apply the changes:
   ```bash
   cd infra/k8s/overlays/<environment>
   kustomize build . | kubectl apply -f -
   kubectl rollout restart deployment/backend -n <namespace>
   kubectl rollout restart deployment/frontend -n <namespace>
   ```

### Scaling Deployments
Update replica counts in the overlay's `kustomization.yaml`:

```yaml
replicas:
  - name: backend
    count: 5
  - name: frontend
    count: 5
```

Or scale manually:
```bash
kubectl scale deployment backend --replicas=5 -n <namespace>
kubectl scale deployment frontend --replicas=5 -n <namespace>
```

## Troubleshooting

### Pods not starting
```bash
# Check pod status
kubectl get pods -n <namespace>

# Describe pod for events
kubectl describe pod <pod-name> -n <namespace>

# Check logs
kubectl logs <pod-name> -n <namespace>

# Check previous logs if pod restarted
kubectl logs <pod-name> -n <namespace> --previous
```

### Image pull errors
```bash
# Check if secret exists
kubectl get secrets -n <namespace>

# Verify image exists in registry
docker pull <image>:<tag>

# Check deployment for image pull policy
kubectl get deployment backend -n <namespace> -o yaml | grep imagePullPolicy
```

### Database connection issues
```bash
# Check if secret is correctly set
kubectl get secret backend-secrets -n <namespace> -o yaml

# Test connection from pod
kubectl exec -it <backend-pod> -n <namespace> -- sh
# Inside pod: test database connection
```

### Service not accessible
```bash
# Check service endpoints
kubectl get endpoints -n <namespace>

# Check if pods are ready
kubectl get pods -n <namespace>

# Port forward for local testing
kubectl port-forward service/backend 8080:80 -n <namespace>
```

## Best Practices

1. **Always use Kustomize** for deployments to ensure consistency
2. **Never commit secrets** to Git - always use Vault or Kubernetes secrets
3. **Test in stage** before deploying to production
4. **Use PR previews** for testing new features
5. **Monitor resource usage** and adjust limits as needed
6. **Enable GitHub environment protection** for production deployments
7. **Tag releases** for production deployments to maintain version history

## Next Steps

1. **Update Registry**: Replace `REGISTRY_PLACEHOLDER` in workflows with your actual registry URL
2. **Configure Domains**: Set up ingress/load balancer configuration in ArvanCloud
3. **Add Health Checks**: Ensure `/health` endpoint exists in backend
4. **Set up Monitoring**: Add Prometheus/Grafana for observability
5. **Configure Autoscaling**: Add HorizontalPodAutoscaler for automatic scaling
6. **Add Resource Quotas**: Set namespace-level resource limits
7. **Implement Network Policies**: Restrict pod-to-pod communication as needed
