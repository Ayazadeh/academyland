import { useFetchApi } from "~/composables/api/useFetchApi";
import { CLIENT_ID, CLIENT_SECRET } from "~/composables/api/api.config";
import { useLoginValidator } from "./login.validator";
import type { AuthTokens, Identity } from "../Auth.interface";
import type { InferType } from "yup";
import type { FetchCustomConfig } from "~/composables/api/FetchCustomConfig.interface";
import { LoginDto } from "./login.dto";

export const useLoginService = () => {
	const fetchData = useFetchApi<LoginDto, LoginDto>(LoginDto);
	const { schema } = useLoginValidator();

	const login = async (
		{ username, password }: InferType<typeof schema>,
		customConfig: FetchCustomConfig
	): Promise<{ tokens: AuthTokens; identity: Identity } | undefined> => {
		const response = await fetchData(
			"/oauth2/rest/token",
			{
				method: "POST",
				body: {
					username,
					password,
					grant_type: "password",
					client_id: CLIENT_ID,
					client_secret: CLIENT_SECRET,
				},
			},
			customConfig
		);

		if (response !== undefined) {
			const { access_token, refresh_token, expires_in, identity } = response;
			return {
				tokens: {
					accessToken: access_token,
					refreshToken: refresh_token,
					expiresIn: new Date().getTime() + expires_in * 1000,
				},
				identity,
			};
		}
		return response;
	};

	return { login };
};
