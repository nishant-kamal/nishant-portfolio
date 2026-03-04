export default function Projects() {
  return (
    <section style={{ marginBottom: "60px" }}>
      <h2>Projects</h2>

      <div>
        <h3>Kubernetes GitOps Deployment</h3>
        <p>
          Deployed applications on AWS EKS using Helm and FluxCD with
          Prometheus and Grafana monitoring.
        </p>
      </div>

      <div>
        <h3>AWS Cost Optimization</h3>
        <p>
          Migrated cluster scaling from Auto Scaling Groups to Karpenter,
          reducing EC2 costs by 35%.
        </p>
      </div>

      <div>
        <h3>Alerting Standardization</h3>
        <p>
          Created a centralized Helm-based alerting system that improved
          monitoring consistency and reduced MTTR.
        </p>
      </div>
    </section>
  );
}
