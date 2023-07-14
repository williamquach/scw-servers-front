import { Link, List } from "@ultraviolet/ui";
import { useEffect, useState } from "react";

// A type that can be used to describe a property of an object for the purpose of sorting.
type Property<T> = Extract<keyof T, string>;

// The shape of an object that can be displayed by the GenericDataTable component.
interface Displayable {
	id: string;
	[key: string]: any;
}

// The shape of a column object used to define the table columns in the GenericDataTable component.
interface Column<T extends Displayable> {
	label: string;
	itemPropertyToDisplay: Property<T>;
	canBeOrdered: boolean;
	info?: string;
}

type OrderDirection = "asc" | "desc" | "none";

export function SortableAndClickableTable<T extends Displayable>({
	itemsReceived,
	columns,
	loadingReceived,
	errorReceived,
	linkToDetails,
}: {
	itemsReceived: T[];
	columns: Column<T>[];
	loadingReceived: boolean;
	errorReceived: string | null;
	linkToDetails: string;
}) {
	const [items, setItems] = useState<T[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// const [pagination, setPagination] = useState<PaginationProps<T>>({
	// 	page: 1,
	// 	pageCount: 1,
	// 	pageTabCount: 5,
	// 	itemsPerPage: 5,
	// 	data: items.slice(0, 5),
	// 	onChange: (newPage: number) => {
	// 		console.log("newPage", newPage);
	// 		setPagination({
	// 			...pagination,
	// 			page: newPage,
	// 			data: items.slice(
	// 				(newPage - 1) * pagination.itemsPerPage,
	// 				newPage * pagination.itemsPerPage
	// 			),
	// 		});
	// 	},
	// });
	useEffect(() => {
		setLoading(loadingReceived);
		setItems(itemsReceived);
		// setPagination({
		// 	...pagination,
		// 	pageCount: Math.ceil(
		// 		itemsReceived.length / pagination.itemsPerPage
		// 	),
		// 	data: items.slice(
		// 		pagination.itemsPerPage * (pagination.page - 1),
		// 		pagination.itemsPerPage * pagination.page
		// 	),
		// });
	}, [itemsReceived, loadingReceived]);

	const [currentSortingProperties, setCurrentSortingProperties] = useState<{
		orderDirection: OrderDirection;
		property: Property<T>;
	}>({
		orderDirection: "none",
		property: columns[0].itemPropertyToDisplay,
	});

	const handleSort = (newOrder: OrderDirection, property: Property<T>) => {
		setCurrentSortingProperties({
			orderDirection: newOrder,
			property: property,
		});

		const sortedItems = [...items].sort((a, b) => {
			if (newOrder === "asc") {
				return a[property] > b[property] ? 1 : -1;
			} else if (newOrder === "desc") {
				return a[property] < b[property] ? 1 : -1;
			} else {
				return 0;
			}
		});

		setItems(sortedItems);
		// setPagination({
		// 	...pagination,
		// 	data: sortedItems.slice(
		// 		(pagination.page - 1) * pagination.itemsPerPage,
		// 		pagination.page * pagination.itemsPerPage
		// 	),
		// });
	};

	const computeOrderDirection = (
		property: Property<T>
	): "asc" | "desc" | "none" => {
		if (currentSortingProperties.property === property) {
			return currentSortingProperties.orderDirection;
		}
		return "none";
	};

	const isColumnOrdered = (property: Property<T>) => {
		return currentSortingProperties.property === property;
	};

	const generateColumn = (
		column: Column<T>
	): {
		label: string;
		info?: string;
		orderDirection?: "asc" | "desc" | "none";
		onOrder?: (newOrder: "asc" | "desc") => void;
		isOrdered?: boolean;
	} => {
		let orderingProperties: {
			orderDirection: "asc" | "desc" | "none";
			onOrder: (newOrder: "asc" | "desc") => void;
			isOrdered: boolean;
		} | null = null;

		if (column.canBeOrdered) {
			orderingProperties = {
				orderDirection: computeOrderDirection(
					column.itemPropertyToDisplay
				),
				onOrder: (newOrder: "asc" | "desc") => {
					handleSort(newOrder, column.itemPropertyToDisplay);
				},
				isOrdered: isColumnOrdered(column.itemPropertyToDisplay),
			};
		}

		return {
			label: column.label,
			info: column.info,
			...orderingProperties,
		};
	};

	return (
		<>
			<div className="flex flex-col items-center w-full p-4 gap-5">
				<List
					loading={loading}
					columns={[
						...columns.map((column) => generateColumn(column)),
						{
							label: "Actions",
						},
					]}
				>
					{errorReceived && (
						<List.Row key={"error"} id="error" sentiment="danger">
							<List.Cell>
								<span className="text-red-500">
									{errorReceived}
								</span>
							</List.Cell>
						</List.Row>
					)}
					{items.map((item) => (
						<List.Row
							key={item.id}
							id={item.id}
							className="text-start"
						>
							{columns.map((column) => (
								<List.Cell
									key={column.itemPropertyToDisplay}
									preventClick
								>
									<Link
										href={`${linkToDetails}/${item.id}`}
										sentiment="neutral"
										prominence="weak"
									>
										{item[column.itemPropertyToDisplay]}
									</Link>
								</List.Cell>
							))}
							<List.Cell>
								<Link
									href={`${linkToDetails}/${item.id}`}
									iconPosition="right"
								>
									Details
								</Link>
							</List.Cell>
						</List.Row>
					))}
				</List>
				{/* <Pagination
					page={pagination.page}
					pageCount={pagination.pageCount}
					onChange={pagination.onChange}
					pageTabCount={pagination.pageTabCount}
				/> */}
			</div>
		</>
	);
}
