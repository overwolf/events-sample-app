/**
 *  Asserts that a certain overwolf operation was successful
 *
 * @param {overwolf.Result} result - The result given by the API
 * @param {string} errorMessage - The message to display if the operation failed
 * @returns {boolean} result - Returns true if the assertion succeeded
 */
export function AssertOverwolfSuccess(
  result: overwolf.Result,
  errorMessage: string,
): boolean {
  if (!result.success)
    throw new Error(
      `${errorMessage}
      Reason Given: ${result.error}`,
    );

  return true;
}
