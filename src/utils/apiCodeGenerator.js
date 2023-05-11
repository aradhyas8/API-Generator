const generateEndpointCode = (config, endpoint, lang) => {
    const { method, path, parameters } = endpoint;
    const isTypescript = lang === "typescript";
  
    let code = `// ${method.toUpperCase()} ${path}\n`;
  
    const functionName = `${method}${path.replace(/\//g, "_")}`;
    const paramsType = isTypescript ? ": Params" : "";
    code += `async function ${functionName}(params${paramsType}) {\n`;
  
    code += "  const response = await fetch(`";
    code += `${config.baseURL}${path.replace(/:[a-zA-Z0-9]+/g, (param) => "${params" + param.substr(1) + "}")}`;
    code += "`, {\n";
    code += `    method: "${method.toUpperCase()}",\n`;
    code += "    headers: {\n";
  
    if (parameters.header) {
      parameters.header.forEach((headerParam) => {
        code += `      "${headerParam.name}": params.${headerParam.name},\n`;
      });
    }
  
    code += "    },\n";
  
    if (method !== "get" && parameters.body) {
      code += "    body: JSON.stringify(params.body),\n";
    }
  
    code += "  });\n";
    code += "  return response.json();\n";
    code += "}\n\n";
  
    return code;
  };
  
  const generateJavascriptCode = (apiConfigs) => {
    let code = "";
  
    apiConfigs.forEach((config) => {
      const { endpoints } = config;
  
      endpoints.forEach((endpoint) => {
        code += generateEndpointCode(config, endpoint, "javascript");
      });
    });
  
    return code;
  };
  
  const generateTypescriptCode = (apiConfigs) => {
    let code = "";
  
    apiConfigs.forEach((config) => {
      const { endpoints } = config;
  
      endpoints.forEach((endpoint) => {
        const { parameters } = endpoint;
  
        if (parameters) {
          code += `interface Params {\n`;
  
          if (parameters.path) {
            parameters.path.forEach((pathParam) => {
              code += `  ${pathParam.name}: string;\n`;
            });
          }
  
          if (parameters.header) {
            parameters.header.forEach((headerParam) => {
              code += `  ${headerParam.name}: string;\n`;
            });
          }
  
          if (endpoint.method !== "get" && parameters.body) {
            code += `  body: {\n`;
            parameters.body.forEach((bodyParam) => {
              code += `    ${bodyParam.name}: ${bodyParam.type};\n`;
            });
            code += `  };\n`;
          }
  
          code += "}\n\n";
        }
  
        code += generateEndpointCode(config, endpoint, "typescript");
      });
    });
  
    return code;
  };
  
  module.exports = { generateJavascriptCode, generateTypescriptCode };
  