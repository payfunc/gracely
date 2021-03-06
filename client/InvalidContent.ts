import { Error } from "../Error"
import { Result } from "../Result"

export interface InvalidContent extends Error {
	status: 400
	type: "invalid content"
	content: {
		type: string
		description: string
		details?: any
	}
	error?: string
}

export function invalidContent(type: string, description: string, details?: any, error?: string): InvalidContent {
	return { status: 400, type: "invalid content", content: { type, description, details }, error }
}

export namespace InvalidContent {
	export function is(value: any): value is InvalidContent {
		return (
			typeof value == "object" &&
			value.status == 400 &&
			value.type == "invalid content" &&
			(value.content == undefined ||
				(typeof value.content == "object" &&
					typeof value.content.type == "string" &&
					typeof value.content.description == "string")) &&
			(value.error == undefined || typeof value.error == "string") &&
			Result.is(value)
		)
	}
}
