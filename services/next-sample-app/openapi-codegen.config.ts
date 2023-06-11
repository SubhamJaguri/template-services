import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  backend: {
    from: {
      source: "url",
      url: "http://localhost:3002/api-json",
    },
    outputDir: "src/backend",
    to: async (context) => {
      const filenamePrefix = "backend";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
