import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };

    this.translations = {
      bg: {
        title: 'Опа! Нещо се обърка',
        description: 'Възникна неочаквана грешка. Не се притеснявайте, вашите данни са в безопасност. Можете да опитате да презаредите страницата или да се върнете към началото.',
        errorLabel: 'Грешка (само в развойна среда):',
        details: 'Детайли',
        reload: 'Презареди страницата',
        goHome: 'Към началото',
        contactText: 'Ако проблемът продължава, моля свържете се с нас на'
      },
      en: {
        title: 'Oops! Something went wrong',
        description: 'An unexpected error occurred. Don\'t worry, your data is safe. You can try reloading the page or returning to the homepage.',
        errorLabel: 'Error (development only):',
        details: 'Details',
        reload: 'Reload Page',
        goHome: 'Go Home',
        contactText: 'If the problem persists, please contact us at'
      }
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const language = this.props.language || 'bg';
      const t = this.translations[language];

      return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-100 to-stone-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border-2 border-stone-200 p-8 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-6">
                <AlertTriangle className="text-red-600" size={40} />
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
                {t.title}
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t.description}
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-left">
                  <h3 className="font-bold text-red-800 mb-2">{t.errorLabel}</h3>
                  <p className="text-sm text-red-700 font-mono break-all mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-sm text-red-600">
                      <summary className="cursor-pointer font-semibold mb-1">{t.details}</summary>
                      <pre className="whitespace-pre-wrap text-xs bg-red-100 p-2 rounded mt-2 overflow-auto max-h-48">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReload}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <RefreshCw size={20} />
                  {t.reload}
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-stone-50 text-slate-900 rounded-2xl font-bold transition-all duration-300 border-2 border-stone-200 hover:border-stone-400 transform hover:scale-105 shadow-lg"
                >
                  <Home size={20} />
                  {t.goHome}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t-2 border-stone-100">
                <p className="text-sm text-slate-500">
                  {t.contactText}{' '}
                  <a
                    href="mailto:kitanskitsvetelin@gmail.com"
                    className="text-stone-700 font-semibold hover:underline"
                  >
                    kitanskitsvetelin@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
