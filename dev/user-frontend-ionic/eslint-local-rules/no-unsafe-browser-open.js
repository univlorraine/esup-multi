/**
 * @fileoverview Interdit les appels directs à Browser.open() avec une URL non sanitizée
 */
"use strict";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Interdit d'appeler Browser.open() sans sanitization explicite",
      category: "Best Practices",
    },
    messages: {
      unsafe: "N'utilise pas Browser.open() directement avec une URL non sanitizée. Préférez Browser.open({ url: sanitizer.sanitize(...) }) ou NavigationService.openExternalUrl(...)",
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        // Vérifie qu'on appelle Browser.open(...)
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.name === "Browser" &&
          node.callee.property.name === "open"
        ) {
          const arg = node.arguments[0];
          if (!arg) return;

          // Autoriser uniquement Browser.open({ url: safeUrl }) où safeUrl vient du sanitizer
          if (arg.type === "ObjectExpression") {
            const urlProp = arg.properties.find(
              (p) => p.key?.name === "url"
            );
            if (urlProp && urlProp.value.type === "CallExpression") {
              // Autoriser sanitizer.sanitize(...)
              const isSafe = urlProp.value.callee.property?.name === "sanitize";

              if (isSafe) return; // OK
            }
          }

          context.report({ node, messageId: "unsafe" });
        }
      },
    };
  },
};
