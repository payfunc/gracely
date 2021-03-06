import { Error } from "../Error"
import { Result } from "../Result"

export interface MalformedContent extends Error {
	status: 400
	type: "malformed content"
	content: { property: string; type: string; description: string; details?: any }
	error?: string
}

export function malformedContent(
	property: string,
	type: string,
	description: string,
	details?: any,
	error?: string
): MalformedContent {
	return { status: 400, type: "malformed content", content: { property, type, description, details }, error }
}

export namespace MalformedContent {
	export function is(value: any): value is MalformedContent {
		return (
			typeof value == "object" &&
			value.status == 400 &&
			value.type == "malformed content" &&
			typeof value.content == "object" &&
			typeof value.content.property == "string" &&
			typeof value.content.type == "string" &&
			typeof value.content.description == "string" &&
			(value.error == undefined || typeof value.error == "string") &&
			Result.is(value)
		)
	}
}
