module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-css-modules', 'stylelint-config-rational-order'],
    plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
    rules: {
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        'plugin/declaration-block-no-ignored-properties': true,
        // 'selector-class-pattern': '^[a-z][a-z0-9]*((-[a-z0-9]+)*|[a-z0-9]*)$'
    },
    ignoreFiles: ['**/*.ts?(x)']
};