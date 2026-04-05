export default function Panel({ title, description, actions, children }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Workspace</p>
          <h2>{title}</h2>
          {description ? <p className="panel-description">{description}</p> : null}
        </div>
        {actions ? <div className="panel-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
