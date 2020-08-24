import type { HttpService } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import { UserAgent } from "../common/types/user-agent.class"

export class UserAgentsProvider {
  private static userAgents = new Set<UserAgent>()

  public static get providerName(): string {
    return "USER_AGENTS"
  }

  public static async init(
    config: ConfigService,
    http: HttpService
  ): Promise<Set<UserAgent>> {
    const userAgentsUrl = config.get<string>("USER_AGENTS_URL")

    if (!userAgentsUrl) {
      return UserAgentsProvider.userAgents
    }

    const res = await http.get(userAgentsUrl).toPromise()
    if (res.status < 200 || res.status >= 300 || !res.data) {
      throw new Error(`Cannot fetch user agents from ${userAgentsUrl}`)
    }
    const userAgentList = res.data
    // for (const line of hosts.split("\n")) {
    //   const l = line.trim()
    //   if (!l || l.startsWith("#")) {
    //     continue
    //   }
    //   const domain = l.split(" ")[1]
    //   UserAgentsProvider.userAgents.add(domain)
    // }
    console.log(JSON.stringify(userAgentList))
    return UserAgentsProvider.userAgents
  }
}
