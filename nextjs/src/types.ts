export type DataType = {
  id?: string
	title: string
	subtitle: string
	aythor?: string
	slug?: string
	image: string
	screenshot?: string
	date?: string
	organization?: string
	skills: string[]
	website?: string
	github?: string
	curriculum?: string
	course?: string
	credentials?: string
}

export type ComponentType = 'project' | 'certificate'


export type JSONValue =
	| string
	| number
	| boolean
	| { [property: string]: JSONValue }
	| Array<JSONValue>