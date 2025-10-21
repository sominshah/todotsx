export interface TodoTypes {
    id: number;
    text: string;
    completed: boolean;
}

// Note: export as a named interface rather than a default export. When
// `verbatimModuleSyntax` is enabled, `export default` must reference a value,
// not just a type. Consumers should import with:
// import { TodoTypes } from './todo'