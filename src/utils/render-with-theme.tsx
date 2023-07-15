import { ThemeProvider } from "@emotion/react";
import { RenderResult, render } from "@testing-library/react";
import { theme } from "@ultraviolet/ui";
import { ReactElement } from "react";

export const renderWithTheme = (ui: ReactElement): RenderResult => {
	return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};
