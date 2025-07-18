import { MessageSquare, User, Share } from 'lucide-react';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('Gönderiliyor...');
    setSubmissionError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('Mesajınız başarıyla gönderildi!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Mesaj gönderilirken bir hata oluştu.');
      }
    } catch (error: any) {
      setSubmissionStatus('');
      setSubmissionError(error.message);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            İletişim
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Projeleriniz için işbirliği yapmak veya soru sormak için benimle iletişime geçin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Birlikte Çalışalım</h3>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Yeni projeler ve öğrenme fırsatları için her zaman açığım. Web geliştirme konusunda
              işbirliği yapmak veya deneyim paylaşmak istiyorsanız, benimle iletişime geçmekten
              çekinmeyin.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-blue-100">ornek@email.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <Share size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">GitHub</h4>
                  <p className="text-blue-100">github.com/kullaniciadiniz</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">LinkedIn</h4>
                  <p className="text-blue-100">linkedin.com/in/profiliniz</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Mesaj Gönder</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Adınız
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-white/70"
                  placeholder="Adınızı yazın"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-white/70"
                  placeholder="email@ornek.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-white/70 resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                disabled={submissionStatus === 'Gönderiliyor...'}
              >
                {submissionStatus === 'Gönderiliyor...' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>

              {submissionStatus === 'Mesajınız başarıyla gönderildi!' && (
                <p className="text-green-300 text-center">{submissionStatus}</p>
              )}
              {submissionError && (
                <p className="text-red-300 text-center">{submissionError}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;