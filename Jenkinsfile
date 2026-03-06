pipeline {
    agent any

    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Select the browser')
        string(name: 'TARGET_ENV', defaultValue: 'staging', description: 'Environment to test')
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running tests on ${params.TARGET_ENV} using ${params.BROWSER}"
                bat "set TARGET_ENV=${params.TARGET_ENV} && npx playwright test --project=${params.BROWSER} --workers=4 "
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}