import { AddNoteToBudgetCommand } from './add-note.command';
import { FunctionHandler } from '@iote/cqrs';

export interface ICommandHandler<TCommand> {
  execute(command: TCommand): Promise<void>;
}

export class AddNoteToBudgetHandler extends FunctionHandler<
  AddNoteToBudgetCommand,
  AddNoteToBudgetResult
> {
  public async execute(
    command: AddNoteToBudgetCommand,
    context: FunctionContext,
    tools: HandlerTools
  ): Promise<void> {
    if (!command.content) {
      throw new Error('Note content cannot be empty');
    }

    if (!command.budgetId || command.budgetId.trim().length === 0) {
      throw new Error('Budget ID is required');
    }

    if (!command.orgId || command.orgId.trim().length === 0) {
      throw new Error('Organization ID is required');
    }

    tools.Logger.log(
      () =>
        `[AddNoteToBudgetHandler].execute: Adding note to budget: ${command.budgetId}`
    );

    const notesRepo = tools.getRepository(
      `orgs/${command.orgId}/budgets/${budgetId}/notes`
    );

    await notesRepo.addNote({
      id: command.orgId,
      content: command.content,
      authorId: command.authorId ?? tools.currentUser.uid,
      budgetId: command.budgetId,
      createdAt: new Date()
    })
  }
}
