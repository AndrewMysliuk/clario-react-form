export interface IValidation {
  regexp: RegExp
  min_length: number
  max_length: number
  value: string
  is_valid: boolean
  is_failed: boolean
}

export type ValidationRuleType = Record<string, IValidation>
