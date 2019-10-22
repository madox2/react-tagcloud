module.exports = {
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '')
  },
  environments: ['browser'],
}
