<template>
  <div class="upcoming-tasks">
    <h3 class="title">Tasks Vencendo em Breve</h3>
    
    <div v-if="loading" class="loading">Carregando...</div>
    
    <div v-else-if="tasks.length === 0" class="empty">
      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>Nenhuma task vencendo nos próximos 7 dias!</p>
    </div>
    
    <div v-else class="task-list">
      <div 
        v-for="task in tasks" 
        :key="task.id" 
        class="task-card"
        :class="getPriorityClass(task.prioridade)"
      >
        <div class="task-header">
          <h4 class="task-title">{{ task.titulo }}</h4>
          <span class="priority-badge" :class="getPriorityClass(task.prioridade)">
            {{ task.prioridade }}
          </span>
        </div>
        
        <div class="task-footer">
          <div class="date-info">
            <svg class="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ formatDate(task.data_vencimento) }}</span>
          </div>
          <span class="days-left" :class="getDaysClass(task.dias_restantes)">
            {{ getDaysText(task.dias_restantes) }}
          </span>
        </div>
      </div>
    </div>
    
    <div v-if="overdueTasks.length > 0" class="overdue-section">
      <h4 class="overdue-title"> Tasks Atrasadas</h4>
      <div class="task-list">
        <div 
          v-for="task in overdueTasks" 
          :key="task.id" 
          class="task-card overdue"
        >
          <div class="task-header">
            <h4 class="task-title">{{ task.titulo }}</h4>
            <span class="priority-badge high">{{ task.prioridade }}</span>
          </div>
          
          <div class="task-footer">
            <div class="date-info">
              <svg class="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(task.data_vencimento) }}</span>
            </div>
            <span class="days-left overdue">
              {{ task.dias_atrasado }} {{ task.dias_atrasado === 1 ? 'dia' : 'dias' }} atrasado
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const loading = ref(true);
const tasks = ref([]);
const overdueTasks = ref([]);

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function getDaysText(days) {
  if (days === 0) return 'Hoje!';
  if (days === 1) return 'Amanhã';
  return `${days} dias`;
}

function getDaysClass(days) {
  if (days === 0) return 'today';
  if (days <= 1) return 'urgent';
  if (days <= 3) return 'soon';
  return '';
}

function getPriorityClass(priority) {
  if (priority === 'Alta') return 'high';
  if (priority === 'Moderada') return 'medium';
  return 'low';
}

async function loadData() {
  try {
    const [upcomingRes, overdueRes] = await Promise.all([
      api.get('/dashboard/upcoming-tasks'),
      api.get('/dashboard/overdue-tasks')
    ]);
    
    tasks.value = upcomingRes.data.data || [];
    overdueTasks.value = overdueRes.data.data || [];
    
    loading.value = false;
  } catch (error) {
    console.error('Erro ao carregar tasks:', error);
    loading.value = false;
  }
}

onMounted(loadData);
</script>

<style scoped>
.upcoming-tasks {
  width: 100%;
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111827;
}

.loading, .empty {
  text-align: center;
  padding: 40px 20px;
  color: #6B7280;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 48px;
  height: 48px;
  color: #10B981;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  border-left: 4px solid #E5E7EB;
  padding: 12px 16px;
  background: #F9FAFB;
  border-radius: 8px;
  transition: all 0.2s;
}

.task-card:hover {
  background: #F3F4F6;
  transform: translateX(4px);
}

.task-card.high {
  border-left-color: #EF4444;
}

.task-card.medium {
  border-left-color: #F59E0B;
}

.task-card.low {
  border-left-color: #3B82F6;
}

.task-card.overdue {
  border-left-color: #DC2626;
  background: #FEF2F2;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.priority-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.priority-badge.high {
  background: #FEE2E2;
  color: #DC2626;
}

.priority-badge.medium {
  background: #FEF3C7;
  color: #D97706;
}

.priority-badge.low {
  background: #DBEAFE;
  color: #2563EB;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6B7280;
  font-size: 13px;
}

.calendar-icon {
  width: 16px;
  height: 16px;
}

.days-left {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
}

.days-left.today {
  background: #FEE2E2;
  color: #DC2626;
}

.days-left.urgent {
  background: #FED7AA;
  color: #EA580C;
}

.days-left.soon {
  background: #FEF3C7;
  color: #D97706;
}

.days-left.overdue {
  background: #FEE2E2;
  color: #DC2626;
}

.overdue-section {
  margin-top: 24px;
}

.overdue-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #DC2626;
}
</style>