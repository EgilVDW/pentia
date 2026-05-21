/**
 * # Refactoring considerations
 *
 * ## 1. Pinia store logic separation
 *
 * ### Current problem
 * Multiple Pinia stores fetch and store overlapping data from Firestore.
 * This results in:
 * - redundant data caching
 * - overly complex stores
 *
 * ### Consideration
 * Establish clearer distinctions and separations between Pinia stores,
 * trimming the amount of data fetched by each store.
 *
 *
 * ## 2. Components structure and naming conventions
 *
 * ### Current problem
 * Components are mostly stored in a single shared folder, with only a small separation for desktop-specific components.
 * In addition, there is no consistent naming convention for components or props.
 *
 * This results in:
 * - difficulty locating related components
 * - unclear component responsibilities
 * - needing to inspect props manually more often
 *
 * ### Consideration
 * Establish consistent naming conventions for components and props,
 * along with a more organized folder structure.
 *
 *
 * ## 3. More components
 *
 * ### Current problem
 * View templates utilize a combination of components and native elements due to prioritizing UI components over layout components.
 *
 * This results in:
 * - less flexibility when restructuring views
 * - duplicated layout structures
 * - less reusability
 *
 * ### Consideration
 * Create reusable layout components and structured blocks
 * to reduce duplication across views.
 *
 * @category guides
 * @name RefactoringConsiderations
 */
