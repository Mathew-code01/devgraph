import { BrainCircuit, Sparkles } from "lucide-react";

function SkillsPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <div className="page-kicker">
            <BrainCircuit size={15} />
            Capability graph
          </div>

          <h2>Skills</h2>

          <p>
            Explore developer capabilities and discover the relationships
            connecting skills to the wider developer ecosystem.
          </p>
        </div>
      </section>

      <div className="feature-placeholder">
        <div className="feature-placeholder-icon">
          <Sparkles size={22} />
        </div>

        <h3>Skill intelligence</h3>

        <p>
          Skill exploration is connected to the seeded graph and will surface
          developers associated with each capability.
        </p>
      </div>
    </div>
  );
}

export default SkillsPage;
