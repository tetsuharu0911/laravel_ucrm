module.exports = {
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/js/$1'
    },
    transformIgnorePatterns: [
        // `node_modules`を除外する設定
        '/node_modules/'
    ],
};