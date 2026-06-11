"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/**
 * MediaDevices 相机拍照（FAB「拍摄照片」）。
 * 无相机 / 无权限时显示友好降级提示，不抛错。
 */
export function CameraCapture({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const start = useCallback(async () => {
    setPhoto(null);
    setError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("当前浏览器不支持相机调用。");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setError("无法访问相机，请检查浏览器权限或设备支持。");
    }
  }, []);

  useEffect(() => {
    if (open) start();
    return stop;
  }, [open, start, stop]);

  const capture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    setPhoto(canvas.toDataURL("image/jpeg", 0.9));
    stop();
  };

  const close = () => {
    stop();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl overflow-hidden w-full max-w-md"
          >
            <div className="flex items-center justify-between px-md py-sm border-b border-surface-variant">
              <span className="text-label-md font-label-md text-on-surface">
                拍摄照片
              </span>
              <button
                onClick={close}
                aria-label="关闭"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high"
              >
                <Icon name="close" size={20} className="text-on-surface-variant" />
              </button>
            </div>

            <div className="relative aspect-[3/4] bg-black flex items-center justify-center">
              {error ? (
                <div className="text-center p-lg text-on-surface-variant">
                  <Icon name="no_photography" size={48} className="mb-sm" />
                  <p className="text-body-md font-body-md">{error}</p>
                </div>
              ) : photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="拍摄预览" className="w-full h-full object-cover" />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex items-center justify-center gap-md p-md min-h-[80px]">
              {photo ? (
                <>
                  <Button variant="ghost" icon="replay" onClick={start}>
                    重拍
                  </Button>
                  <Button
                    icon="check"
                    onClick={() => {
                      toast("照片已添加，可用于新建动态 📷", "success");
                      close();
                    }}
                  >
                    使用照片
                  </Button>
                </>
              ) : !error ? (
                <button
                  onClick={capture}
                  aria-label="拍照"
                  className="w-16 h-16 rounded-full bg-primary border-4 border-surface shadow-lg active:scale-90 transition-transform"
                />
              ) : (
                <Button variant="ghost" icon="refresh" onClick={start}>
                  重试
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
