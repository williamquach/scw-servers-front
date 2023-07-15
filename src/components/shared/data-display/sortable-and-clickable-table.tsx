import { Link, List } from "@ultraviolet/ui";
import { useCallback, useMemo, useState } from "react";

// A type that can be used to describe a property of an object for the purpose of sorting.
type Property<T> = Extract<keyof T, string>;

// The shape of an object that can be displayed by the GenericDataTable component.
interface Displayable {
	id: string | number;
	[key: string]: any;
}

// The shape of a column object used to define the table columns in the GenericDataTable component.
export interface Column<T extends Displayable> {
	label: string;
	itemPropertyToDisplay: Property<T>;
	canBeOrdered: boolean;
	info?: string;
}

type OrderDirection = "asc" | "desc" | "none";

export interface SortableAndClickableTableProps<T extends Displayable> {
	itemsReceived: T[];
	columns: Column<T>[];
	loading: boolean;
	errorReceived: string | null;
	linkToDetails: string;
}

export function SortableAndClickableTable<T extends Displayable>({
	itemsReceived,
	columns,
	loading,
	errorReceived,
	linkToDetails,
}: SortableAndClickableTableProps<T>) {
	if (columns.length === 0) {
		throw new Error("No columns provided");
	}

	const [currentSortingProperties, setCurrentSortingProperties] = useState<{
		orderDirection: OrderDirection;
		property: Property<T>;
	}>({
		orderDirection: "none",
		property: columns[0].itemPropertyToDisplay,
	});

	const sortItems = useCallback(
		(items: T[], newOrder: OrderDirection, property: Property<T>) => {
			const sortedItems = [...items].sort((a, b) => {
				if (newOrder === "asc") {
					return a[property] > b[property] ? 1 : -1;
				} else if (newOrder === "desc") {
					return a[property] < b[property] ? 1 : -1;
				} else {
					return 0;
				}
			});

			return sortedItems;
		},
		[]
	);

	const sortedData = useMemo(() => {
		return sortItems(
			itemsReceived,
			currentSortingProperties.orderDirection,
			currentSortingProperties.property
		);
	}, [itemsReceived, currentSortingProperties, sortItems]);

	const handleSort = (
		items: T[],
		newOrder: OrderDirection,
		property: Property<T>
	) => {
		setCurrentSortingProperties({
			orderDirection: newOrder,
			property: property,
		});

		return sortItems(items, newOrder, property);
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
					handleSort(
						itemsReceived,
						newOrder,
						column.itemPropertyToDisplay
					);
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
			<div className="flex flex-col items-start w-full gap-5">
				{errorReceived && (
					<span className="text-red-500 text-start font-bold">
						{errorReceived}
					</span>
				)}
				{!errorReceived && (
					<List
						loading={loading}
						columns={[
							...columns.map((column) => generateColumn(column)),
							{
								label: "Actions",
							},
						]}
					>
						{sortedData.map((item) => (
							<List.Row
								key={item.id}
								id={item.id.toString()}
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
				)}

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
