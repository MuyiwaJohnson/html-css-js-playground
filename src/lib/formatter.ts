import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";
import parserBabel from "prettier/parser-babel";

export const formatCode = async (
  code: string,
  language: "html" | "css" | "javascript",
): Promise<string> => {
  try {
    const parser =
      language === "html" ? "html" : language === "css" ? "css" : "babel";
    const formatted = await prettier.format(code, {
      parser,
      plugins: [parserHtml, parserCss, parserBabel],
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      printWidth: 80,
    });
    return formatted.trim();
  } catch (error) {
    console.error("Formatting error:", error);
    return code; 
  }
};
