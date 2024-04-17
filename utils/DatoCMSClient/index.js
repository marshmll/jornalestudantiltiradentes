function createDatoCMSClient(token) {
  if (!token) {
    throw new Error("Token inválido.");
  }

  const queryCMS = async (queryString) => {
    if (!queryString) {
      throw new Error("Consulta inválida.");
    }

    try {
      const response = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: queryString }),
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao fazer a requisição ao servidor: ${response.status}`
        );
      }

      const responseJson = await response.json();
      console.log(await responseJson.data);
      return responseJson.data;
    } catch (error) {
      throw new Error(`Erro ao processar a requisição: ${error.message}`);
    }
  };

  return Object.freeze({ queryCMS });
}

const client = createDatoCMSClient(process.env.NEXT_PUBLIC_DATOCMS_TOKEN);

export default client;
