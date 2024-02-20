function createJSXBuilder() {
  function buildFromRecordContent(content = []) {
    if (!Array.isArray(content)) {
      throw new Error("O conteúdo deve ser um array.");
    }

    let builtJSXNodes = [];

    content.forEach((element) => {
      let builderFunction = JSXBuilders[element.__typename];
      if (builderFunction) {
        let JSXnode = builderFunction(element);
        builtJSXNodes.push(JSXnode);
      }
    });

    return builtJSXNodes;
  }

  return Object.freeze({
    buildFromRecordContent,
  });
}

const JSXBuilders = {
  // Builders keys matches DatoCMS __typename metadata for each type of element.
  Heading2Record: (element) => (
    <h2
      key={element.id}
      style={{ borderLeft: "3px solid rgb(153, 27, 27)", paddingLeft: "1rem" }}
      className="block mb-4 text-3xl font-bold"
    >
      {element.text}
    </h2>
  ),

  ParagraphRecord: (element) => (
    <p key={element.id} className="mb-4 text-lg">
      {element.text}
    </p>
  ),

  ImageRecord: (element) => (
    <div key={element.id} className="relative mb-4">
      <img
        className="w-full h-auto"
        src={element.source.url}
        title={element.alt}
        alt={element.alt}
      />
      <div
        style={{ backgroundColor: "#00000055" }}
        className="block absolute bottom-0 p-2 text-white drop-shadow-lg w-full"
      >
        {element.span}
      </div>
    </div>
  ),

  BlockquoteRecord: (element) => (
    <blockquote
      className="mb-4"
      key={element.id}
      style={{
        paddingLeft: "2rem",
        borderLeft: "2px solid rgb(153, 27, 27)",
      }}
    >
      <p className="text-lg my-4">"{element.text}"</p>
      <footer>
        <cite>— {element.author}</cite>
      </footer>
    </blockquote>
  ),

  VideoRecord: (element) => <h1>VideoRecord</h1>,
};

const JSXBuilder = createJSXBuilder();
export default JSXBuilder;
