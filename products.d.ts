export interface Product {
	readonly id?: number;
	title: string;
	productno: string;
	barcode?: string;
	serieno?: string;
	price?: number;
	costprice?: number;
	stockno?: number;
	readonly previousstockno?: number;
	readonly stocknochangetype?: "absolute" | "relative";
	stockmin?: number;
	stockmax?: number;
	suppliername?: string;
	color?: string;
	styleno?: string;
	size?: string;
	brand?: string;
	vat?: number;
	lastordered?: string;
	tags?: Array<any>;
	customfield1?: string;
	customfield2?: string;
	customfield3?: string;
	readonly created?: string;
	readonly reservedstock?: number;
	readonly tobeordered?: number;
	readonly onshoppinglist?: number;
	readonly ordered?: number;
	readonly needsordering?: number;
	readonly flexposuid?: string;
	readonly flexposviewgroup?: string;
	flexposviewgroupid?: string;
	flexposfinancegroup?: string;
	flexposfinancegroupid?: string;
	flexposbrandid?: string;
}

export interface SearchProductResponse {
	content: Array<Product>;
}
