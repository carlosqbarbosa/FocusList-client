<template>
  <header class="w-full bg-white shadow-sm px-6 py-4">
    <div class="lg:col-span-1">
      <div class="flex items-center gap-3 mb-4">
        <!-- Logo Minimalista -->
        <div class="logo-wrapper relative">
          <div class="logo-container bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-2.5 transition-transform duration-200 hover:scale-105">
            <!-- Timer minimalista -->
            <div class="timer-minimal">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Círculo principal -->
                <circle cx="24" cy="24" r="18" stroke="white" stroke-width="2" opacity="0.9"/>
                
                <!-- Marcadores simples -->
                <circle cx="24" cy="8" r="1.5" fill="white" opacity="0.7"/>
                <circle cx="40" cy="24" r="1.5" fill="white" opacity="0.7"/>
                <circle cx="24" cy="40" r="1.5" fill="white" opacity="0.7"/>
                <circle cx="8" cy="24" r="1.5" fill="white" opacity="0.7"/>
                
                <!-- Ponteiro hora -->
                <line x1="24" y1="24" x2="24" y2="15" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
                
                <!-- Ponteiro minuto -->
                <line x1="24" y1="24" x2="31" y2="27" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.9"/>
                
                <!-- Centro -->
                <circle cx="24" cy="24" r="2" fill="white"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Título simples -->
        <div class="flex items-baseline gap-1.5">
          <span class="text-3xl font-semibold text-gray-800">
            Focus
          </span>
          <span class="text-3xl font-semibold text-blue-600">
            List
          </span>
        </div>
      </div>
      
      <StatusCard />
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>
.logo-wrapper {
  width: fit-content;
  height: fit-content;
}

.logo-container {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.12);
}

.timer-minimal {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

header {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>