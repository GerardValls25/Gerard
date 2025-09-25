@keyframes blinkScaleEffect {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.1); }
}
.blink-scale {
  animation: blinkScaleEffect 0.8s ease-in-out 3;
}

.fade-header {
  animation: fadeInHeader 0.5s ease-in-out;
}
@keyframes fadeInHeader {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shakeEffect {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}
#scrollTopBtn.shake {
  animation: shakeEffect 0.6s ease-in-out;
}
