export type UserPromptHandlerType = "accept" | "dismiss" | "ignore";

export type UserPromptHandler = {
  alert?: UserPromptHandlerType,
  beforeUnload?: UserPromptHandlerType,
  confirm?: UserPromptHandlerType,
  default?: UserPromptHandlerType,
  prompt?: UserPromptHandlerType
}