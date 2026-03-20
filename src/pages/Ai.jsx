import { useState } from "react";
import axios from "axios";
import { FaSearch, FaShieldAlt } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { MdSmartToy } from "react-icons/md";

const API_URL = "https://rubayed001-fake-news.hf.space";

const Ai = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/predict`, { text });
      setResult(res.data);
    } catch (err) {
      setError("API Error! Please try again.");
    }
    setLoading(false);
  };

  // Color config for each label
  const config = {
    authentic: {
      color: "#22c55e",
      bg: "rgba(34,197,94,0.12)",
      border: "#22c55e",
      emoji: "✅",
      label: "আসল সংবাদ",
      badge: "bg-green-100 text-green-700",
    },
    fake: {
      color: "#ef4444",
      bg: "rgba(239,68,68,0.12)",
      border: "#ef4444",
      emoji: "❌",
      label: "ভুয়া সংবাদ",
      badge: "bg-red-100 text-red-700",
    },
    ai_fake: {
      color: "#f97316",
      bg: "rgba(249,115,22,0.12)",
      border: "#f97316",
      emoji: "🤖",
      label: "AI তৈরি ভুয়া",
      badge: "bg-orange-100 text-orange-700",
    },
  };

  const getConfig = (label) =>
    config[label] || {
      color: "#6b7280",
      bg: "rgba(107,114,128,0.12)",
      border: "#6b7280",
      emoji: "❓",
      label,
      badge: "bg-gray-100 text-gray-700",
    };

  const final = result ? getConfig(result.final_prediction) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] px-4 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4 border border-blue-400/30">
          <FaShieldAlt className="text-blue-400 text-2xl" />
        </div>
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          বাংলা ভুয়া সংবাদ সনাক্তকরণ
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Powered by SVM + BanglaBERT + Llama 70B
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">

        {/* Textarea */}
        <label className="block text-slate-300 text-sm font-medium mb-2">
          সংবাদের টেক্সট লিখুন বা পেস্ট করুন
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="এখানে বাংলা সংবাদ paste করুন..."
          rows={6}
          className="w-full bg-white/8 border border-white/20 rounded-xl p-4 text-white text-sm placeholder-slate-500 outline-none focus:border-blue-400 resize-none transition"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />

        {/* Word count */}
        <p className="text-slate-500 text-xs mt-1 text-right">
          {text.length} characters
        </p>

        {/* Analyze Button */}
        <button
          onClick={analyze}
          disabled={loading || !text.trim()}
          className="w-full mt-4 py-3 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading
              ? "#475569"
              : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          }}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              বিশ্লেষণ হচ্ছে...
            </>
          ) : (
            <>
              <FaSearch />
              বিশ্লেষণ করুন
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-center gap-2 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-sm">
            <FiAlertTriangle className="shrink-0" />
            {error}
          </div>
        )}

        {/* Result */}
        {result && final && (
          <div className="mt-6 space-y-4">

            {/* Final Verdict */}
            <div
              className="rounded-2xl p-6 text-center border"
              style={{ background: final.bg, borderColor: final.border }}
            >
              <div className="text-5xl mb-3">{final.emoji}</div>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: final.color }}
              >
                {final.label}
              </div>
              <p className="text-slate-400 text-sm mb-4">
                চূড়ান্ত বিশ্লেষণ ফলাফল
              </p>

              {/* Confidence Bar */}
              <div className="text-left">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>BanglaBERT Confidence</span>
                  <span className="font-semibold" style={{ color: final.color }}>
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${result.confidence * 100}%`,
                      background: final.color,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Model Results Grid */}
            <div>
              <p className="text-slate-400 text-xs mb-3 font-medium uppercase tracking-wider">
                প্রতিটি মডেলের ফলাফল
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(result.all_predictions).map(([model, pred]) => {
                  const c = getConfig(pred);
                  return (
                    <div
                      key={model}
                      className="rounded-xl p-4 text-center border"
                      style={{
                        background: c.bg,
                        borderColor: c.border,
                      }}
                    >
                      {/* Model name */}
                      <p className="text-slate-400 text-xs mb-2 font-medium truncate">
                        {model}
                      </p>
                      <div className="text-2xl mb-1">{c.emoji}</div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: c.color }}
                      >
                        {c.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-slate-500 text-xs text-center pt-2">
              * এই ফলাফল AI মডেল দ্বারা তৈরি। চূড়ান্ত সিদ্ধান্তের জন্য বিশেষজ্ঞের পরামর্শ নিন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai;