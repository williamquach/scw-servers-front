import { ServerStatus } from "../../../models/server-status";
import { ServerType } from "../../../models/server-type";
import { Server } from "../../../models/server.model";
import {
	Column,
	SortableAndClickableTable,
} from "./sortable-and-clickable-table";
import { renderWithTheme } from "../../../utils/render-with-theme";

describe(SortableAndClickableTable, () => {
	it("should display a table with the correct number of columns", () => {
		const items: Server[] = [];
		const columns: Column<Server>[] = [
			{
				label: "Name",
				itemPropertyToDisplay: "name",
				canBeOrdered: true,
			},
			{
				label: "Type",
				info: "Server can be small, medium, or large",
				itemPropertyToDisplay: "type",
				canBeOrdered: true,
			},
			{
				label: "Status",
				info: "Server can be starting, running, stopped, or stopping",
				itemPropertyToDisplay: "status",
				canBeOrdered: true,
			},
		];
		const loading = false;
		const errorReceived = null;
		const linkToDetails = "/servers";

		const { getByText } = renderWithTheme(
			<SortableAndClickableTable
				itemsReceived={items}
				columns={columns}
				loading={loading}
				errorReceived={errorReceived}
				linkToDetails={linkToDetails}
			/>
		);

		const nameColumn = getByText("Name");
		const statusColumn = getByText("Status");
		const typeColumn = getByText("Type");
		expect(nameColumn).toBeInTheDocument();
		expect(statusColumn).toBeInTheDocument();
		expect(typeColumn).toBeInTheDocument();
	});

	it("should display a table with the correct number of rows", () => {
		const items: Server[] = [
			{
				id: 14,
				name: "Server 14",
				status: ServerStatus.STARTING,
				type: ServerType.MEDIUM,
			},
			{
				id: 19,
				name: "Server 19",
				status: ServerStatus.STARTING,
				type: ServerType.MEDIUM,
			},
		];
		const columns: Column<Server>[] = [
			{
				label: "Name",
				itemPropertyToDisplay: "name",
				canBeOrdered: true,
			},
			{
				label: "Type",
				info: "Server can be small, medium, or large",
				itemPropertyToDisplay: "type",
				canBeOrdered: true,
			},
			{
				label: "Status",
				info: "Server can be starting, running, stopped, or stopping",
				itemPropertyToDisplay: "status",
				canBeOrdered: true,
			},
		];
		const loading = false;
		const errorReceived = null;
		const linkToDetails = "/servers";

		const { getAllByRole } = renderWithTheme(
			<SortableAndClickableTable
				itemsReceived={items}
				columns={columns}
				loading={loading}
				errorReceived={errorReceived}
				linkToDetails={linkToDetails}
			/>
		);

		const rows = getAllByRole("row");
		expect(rows.length).toBe(items.length + 1);
	});

	it("should display a table containing given items", () => {
		const items: Server[] = [
			{
				id: 14,
				name: "Server 14",
				status: ServerStatus.STARTING,
				type: ServerType.MEDIUM,
			},
			{
				id: 19,
				name: "Server 19",
				status: ServerStatus.RUNNING,
				type: ServerType.LARGE,
			},
		];
		const columns: Column<Server>[] = [
			{
				label: "Name",
				itemPropertyToDisplay: "name",
				canBeOrdered: true,
			},
			{
				label: "Type",
				info: "Server can be small, medium, or large",
				itemPropertyToDisplay: "type",
				canBeOrdered: true,
			},
			{
				label: "Status",
				info: "Server can be starting, running, stopped, or stopping",
				itemPropertyToDisplay: "status",
				canBeOrdered: true,
			},
		];
		const loading = false;
		const errorReceived = null;
		const linkToDetails = "/servers";

		const { getByText } = renderWithTheme(
			<SortableAndClickableTable
				itemsReceived={items}
				columns={columns}
				loading={loading}
				errorReceived={errorReceived}
				linkToDetails={linkToDetails}
			/>
		);

		for (const item of items) {
			const name = getByText(item.name);
			const type = getByText(item.type);
			const status = getByText(item.status);
			expect(name).toBeInTheDocument();
			expect(type).toBeInTheDocument();
			expect(status).toBeInTheDocument();
		}
	});

	it("should display details link for each item", () => {
		const items: Server[] = [
			{
				id: 14,
				name: "Server 14",
				status: ServerStatus.STARTING,
				type: ServerType.MEDIUM,
			},
			{
				id: 19,
				name: "Server 19",
				status: ServerStatus.RUNNING,
				type: ServerType.LARGE,
			},
		];
		const columns: Column<Server>[] = [
			{
				label: "Name",
				itemPropertyToDisplay: "name",
				canBeOrdered: true,
			},
			{
				label: "Type",
				info: "Server can be small, medium, or large",
				itemPropertyToDisplay: "type",
				canBeOrdered: true,
			},
			{
				label: "Status",
				info: "Server can be starting, running, stopped, or stopping",
				itemPropertyToDisplay: "status",
				canBeOrdered: true,
			},
		];
		const loading = false;
		const errorReceived = null;
		const linkToDetails = "/servers";

		const { getAllByText } = renderWithTheme(
			<SortableAndClickableTable
				itemsReceived={items}
				columns={columns}
				loading={loading}
				errorReceived={errorReceived}
				linkToDetails={linkToDetails}
			/>
		);

		const detailLinks = getAllByText("Details");
		expect(detailLinks.length).toBe(items.length);
	});
});
