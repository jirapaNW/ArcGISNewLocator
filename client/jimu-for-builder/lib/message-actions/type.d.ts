import { type UseDataSource, type IMSqlExpression, type ImmutableObject, type MessageActionConnectionType } from 'jimu-core';
export interface Config {
    messageUseDataSource: UseDataSource;
    actionUseDataSource: UseDataSource;
    sqlExprObj?: IMSqlExpression;
    enabledDataRelationShip?: boolean;
    connectionType?: MessageActionConnectionType;
    enableQueryWithCurrentExtent?: boolean;
}
export type IMConfig = ImmutableObject<Config>;