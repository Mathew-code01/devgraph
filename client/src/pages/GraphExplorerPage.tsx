import { GitBranch, Network, ZoomIn, ZoomOut } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { useDeveloperGraph } from "../hooks/useGraph";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function GraphExplorerPage() {
  const [params] = useSearchParams();

  const developerId = params.get("developer") ?? undefined;

  const [depth, setDepth] = useState(2);

  const query = useDeveloperGraph(developerId, depth);

  return (
    <div className="page graph-page">
      <section className="page-hero">
        <div>
          <div className="page-kicker">
            <Network size={15} />
            CognoDB traversal
          </div>

          <h2>Graph Explorer</h2>

          <p>
            Explore connected developers, projects, technologies, skills and
            companies through graph relationships.
          </p>
        </div>
      </section>

      <Card className="graph-workspace">
        <div className="graph-toolbar">
          <div className="graph-toolbar-title">
            <GitBranch size={17} />

            <div>
              <strong>Relationship graph</strong>
              <span>Traversal depth: {depth}</span>
            </div>
          </div>

          <div className="graph-controls">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDepth((value) => Math.max(1, value - 1))}
            >
              <ZoomOut size={15} />
              Depth
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDepth((value) => Math.min(5, value + 1))}
            >
              <ZoomIn size={15} />
              Depth
            </Button>
          </div>
        </div>

        <div className="graph-canvas">
          {query.isLoading && (
            <LoadingState compact message="Building graph..." />
          )}

          {query.isError && (
            <ErrorState
              title="Graph unavailable"
              message={
                query.error instanceof Error
                  ? query.error.message
                  : "Could not retrieve graph data."
              }
              onRetry={() => query.refetch()}
            />
          )}

          {!developerId && !query.isLoading && (
            <div className="graph-empty">
              <div className="graph-empty-icon">
                <Network size={28} />
              </div>

              <h3>Select a developer</h3>

              <p>
                Open a developer profile and choose "Explore graph" to visualize
                their relationships.
              </p>
            </div>
          )}

          {query.isSuccess && (
            <div className="graph-data-preview">
              <div className="graph-preview-header">
                <span>Nodes</span>
                <strong>{query.data.data.nodes.length}</strong>
              </div>

              <div className="graph-preview-header">
                <span>Relationships</span>
                <strong>{query.data.data.relationships.length}</strong>
              </div>

              <div className="graph-node-list">
                {query.data.data.nodes.map((node) => (
                  <div className="graph-node-row" key={node.id}>
                    <span className="graph-node-type">{node.type}</span>

                    <strong>{node.label}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default GraphExplorerPage;
