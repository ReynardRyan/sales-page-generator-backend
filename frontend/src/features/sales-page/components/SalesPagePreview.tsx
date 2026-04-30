import { CheckCircle2, Star, ArrowRight, Zap } from 'lucide-react';
import type { SalesPage } from '@/types';

interface SalesPagePreviewProps {
  page: SalesPage;
}

export function SalesPagePreview({ page }: SalesPagePreviewProps) {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>{page.product_name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {page.headline}
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto mb-8">
            {page.subheadline}
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg inline-flex items-center gap-2 transition-colors">
            {page.cta_text}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      {page.benefits?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Why Choose {page.product_name}?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {page.features_output?.length > 0 && (
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Powerful Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {page.features_output.map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                    <Zap className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Proof */}
      {page.social_proof && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xl text-slate-700 italic leading-relaxed">
              "{page.social_proof}"
            </blockquote>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <div className="bg-white rounded-2xl border-2 border-primary-200 shadow-lg p-8 mb-8">
            <div className="text-4xl font-bold text-primary-600 mb-2">{page.price}</div>
            <p className="text-slate-600 mb-6">{page.pricing_text}</p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-xl text-lg w-full inline-flex items-center justify-center gap-2 transition-colors">
              {page.cta_text}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-slate-500">Target audience: {page.target_audience}</p>
        </div>
      </section>
    </div>
  );
}
