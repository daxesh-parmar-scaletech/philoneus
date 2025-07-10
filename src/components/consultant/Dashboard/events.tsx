import { Link } from "react-router-dom";
import { Share2, Trash, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFlow } from "contexts/FlowContext";
import { useState } from "react";
import { useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";

// Blue and white dot-style QR card component
const QRCard = ({ url }: { url: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      type: "svg",
      data: url,
      dotsOptions: {
        color: "#2563eb",
        type: "dots",
      },
      backgroundOptions: {
        color: "#fff",
      },
      cornersSquareOptions: {
        color: "#2563eb",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#2563eb",
        type: "dot",
      },
    });
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
    return () => {
      if (qrRef.current) qrRef.current.innerHTML = "";
    };
  }, [url]);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center w-full max-w-xs">
      <div className="rounded-xl p-2 bg-blue-50 mb-4" ref={qrRef} />
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
        Share Flow
      </h3>
      <div className="text-center text-base font-semibold text-gray-800 mb-1">
        Scan QR Code to open this flow
      </div>
      <div className="text-center text-sm text-gray-500">{url}</div>
    </div>
  );
};

export default function Events() {
  const { flows } = useFlow();
  const { t } = useTranslation();
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrLink, setQrLink] = useState("");

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {t("dashboard.myActiveFlows")}
      </h3>
      {flows.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">{t("common.noFlowsFound")}</p>
          <p className="text-sm">{t("common.createNewFlowToStart")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows
            .filter((flow) => flow.isPublished)
            .map((flow) => (
              <div
                key={flow.id}
                className="flex flex-col justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {flow.title}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {/* <Link
                                            to={`/consultant/flow/${flow.id}/edit`}
                                            className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                                            title={t('dashboard.editFlow')}
                                        >
                                            <Edit3 className='w-4 h-4' />
                                        </Link>
                                        <Link
                                            to={`/flow/${flow.id}`}
                                            className='p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                                            title={t('dashboard.viewAsUser')}
                                        >
                                            <Eye className='w-4 h-4' />
                                        </Link> */}
                    <button
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title={t("dashboard.shareFlow")}
                      onClick={() => {
                        setQrLink(`${window.location.origin}/flow/${flow.id}`);
                        setShowQRModal(true);
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={t("common.delete")}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {flow.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {flow.submissionCounts?.started || 0}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("dashboard.starts")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {flow.submissionCounts?.completed || 0}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("dashboard.completions")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {flow.submissionCounts?.reviewed || 0}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("dashboard.reviews")}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/consultant/flow/${flow.id}/edit`}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    {t("dashboard.editFlow")}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
          <div className="relative animate-scaleIn">
            <QRCard url={qrLink} />
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 bg-white rounded-full p-1 shadow"
              onClick={() => setShowQRModal(false)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .animate-fadeIn { animation: fadeIn 0.2s ease; }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .animate-scaleIn { animation: scaleIn 0.25s cubic-bezier(0.4,0,0.2,1); }
          `}</style>
        </div>
      )}
    </div>
  );
}
