export default function WebflowMirror({ page }) {
  if (!page) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        Page content not found.
      </div>
    );
  }

  return (
    <>
      {page.styles?.map((css, index) => (
        <style
          key={`${page.key}-style-${index}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      ))}
      <div
        className="uc-webflow-mirror"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </>
  );
}
