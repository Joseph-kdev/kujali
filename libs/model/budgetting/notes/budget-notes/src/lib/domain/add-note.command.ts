export interface BudgetNote {
  orgId: string;
  budgetId: string
  content: string;
  authorId: string;
  createdAt: Date | string;
}

export class AddNoteToBudgetCommand {
  readonly orgId: string;
  readonly budgetId: string;
  readonly content: string;
  readonly authorId: string;
  readonly createdAt: Date | string;

  constructor(data: BudgetNote) {
    this.orgId = data.id;
    this.budgetId = data.budgetId;
    this.content = data.content.trim();
    this.authorId = data.authorId;
    this.createdAt = data.createdAt;
  }
}
