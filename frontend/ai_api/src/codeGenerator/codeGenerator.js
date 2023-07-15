function codeGenerator(endpoints) {
  let code = `
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
  `;

  endpoints.forEach((endpoint) => {
    // Define schema
    let schemaFields = endpoint.parameters
      .map(
        (param) =>
          `${param.name}: { type: ${param.type}, required: ${param.required} }`
      )
      .join(",\n  ");

    code += `
// Define ${endpoint.path} schema
const ${endpoint.path}Schema = new mongoose.Schema({
  ${schemaFields}
}, { timestamps: true });

// Define ${endpoint.path} model
const ${
      endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
    } = mongoose.model('${
      endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
    }', ${endpoint.path}Schema);
    `;

    // Define routes
    if (endpoint.method === "GET") {
      code += `
// Read ${endpoint.path}s
router.get('/${endpoint.path}', async (req, res) => {
  try {
    const ${endpoint.path}s = await ${
        endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
      }.find();
    res.send(${endpoint.path}s);
  } catch (error) {
    res.status(500).send(error);
  }
});
      `;
    } else if (endpoint.method === "POST") {
      code += `
// Create ${endpoint.path}
router.post('/${endpoint.path}', async (req, res) => {
  const ${endpoint.path} = new ${
        endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
      }(req.body);
  try {
    await ${endpoint.path}.save();
    res.status(201).send(${endpoint.path});
  } catch (error) {
    res.status(400).send(error);
  }
});
      `;
    } else if (endpoint.method === "PUT") {
      // this is an example, you need to customize this based on how you handle your PUT operations
      code += `
// Update ${endpoint.path}
router.put('/${endpoint.path}/:id', async (req, res) => {
  try {
    const ${endpoint.path} = await ${
        endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
      }.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!${endpoint.path}) return res.status(404).send('${
        endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
      } not found');
    res.send(${endpoint.path});
  } catch (error) {
    res.status(400).send(error);
  }
});
      `;
    } else if (endpoint.method === "DELETE") {
      // this is an example, you need to customize this based on how you handle your DELETE operations
      code += `
// Delete ${endpoint.path}
router.delete('/${endpoint.path}/:id', async (req, res) => {
  try {
    const ${endpoint.path} = await ${
        endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
      }.findByIdAndDelete(req.params.id);
    if (!${endpoint.path}) return res.status(404).send('${
        endpoint.path.charAt(0).toUpperCase() + endpoint.path.slice(1)
      } not found');
    res.send(${endpoint.path});
  } catch (error) {
    res.status(500).send(error);
  }
});
      `;
    }
  });

  code += `
// Export the router
module.exports = router;
  `;

  return code;
};

module.exports = {
  codeGenerator,
};
