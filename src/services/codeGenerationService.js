function codeGenerator(apiConfigs) {
  let code = `
    const express = require('express');
    const app = express();

    app.use(express.json());
  `;

  for (let config of apiConfigs) {

    const endpoint = config.endpoint;
    const method = config.method;
    const parameters = config.parameters;
    const response = config.response;

    let pramasCode = '';
    for(let param of parameters) {
      paramsCode += `
      let ${param.name} = req.paramas.${param.name};
      `;
    }

    code += `
        app.${method.toLowerCase()}('${endpoint}', (req, res) => {
            ${paramsCode}

            // Mock response
            res.json(${JSON.stringify(response)});
        });
        `;
    }

    code += `
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
    `;

    return code;
}

module.exports = {
    codeGenerator,
};