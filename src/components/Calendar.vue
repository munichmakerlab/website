<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />

    <div 
      v-if="popover.visible" 
      class="event-popover"
      :style="{ top: `${popover.y}px`, left: `${popover.x}px` }"
      @click.stop 
    >
      <div class="popover-header">
        <strong>{{ popover.title }}</strong>
      </div>
      <div class="popover-time">
        {{ popover.time }}
      </div>
      <div v-if="popover.description" class="popover-body">
        {{ popover.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import listPlugin from '@fullcalendar/list'

// --- Popover State & Logic ---
const popover = ref({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  time: '',
  description: ''
})

const closePopover = () => {
  popover.value.visible = false
}

// Global click listener to close popover when clicking anywhere else
const handleGlobalClick = () => {
  if (popover.value.visible) {
    closePopover()
  }
}

onMounted(() => {
  window.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleGlobalClick)
})

const formatEventTime = (event) => {
  if (!event.start) return ''
  
  const options = { hour: '2-digit', minute: '2-digit', hour12: false }
  const start = event.start.toLocaleTimeString([], options)
  
  if (event.end) {
    const end = event.end.toLocaleTimeString([], options)
    return `${start} - ${end}`
  }
  
  return start
}
// --- End of Popover State & Logic ---


// --- Calendar Configuration ---
const calendarOptions = ref({
  plugins: [dayGridPlugin, iCalendarPlugin, listPlugin, timeGridPlugin],
  initialView: 'dayGridMonth',
  firstDay: 1,
  locale: 'de',
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  // Hover tooltip to see the full title
  eventDidMount: (info) => {
    if (info.event.title) {
      info.el.setAttribute('title', info.event.title);
    }
  },
  // Click Handler for Popover with event details
  eventClick: (info) => {
    info.jsEvent.preventDefault();
    // Stop propagation so the global window click listener doesn't immediately close the popover
    info.jsEvent.stopPropagation();

    const { event, jsEvent } = info;
    
    popover.value = {
      visible: true,
      // Position based on mouse click coordinates
      x: jsEvent.clientX,
      y: jsEvent.clientY,
      title: event.title,
      time: formatEventTime(event),
      // iCal feeds usually put descriptions in extendedProps
      description: event.extendedProps.description || '' 
    }
  },
  eventSources: [
    {
      url: '/api/get-calendar?source=pretix',
      format: 'ics',
      color: '#3788d8',
      label: 'Workshops'
    },
    {
      url: '/api/get-calendar?source=events',
      format: 'ics',
      color: '#f89538ff',
      label: 'Open Events'
    }
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  }
})
</script>
// --- End of Calendar Configuration ---


// --- Styles for Popover ---
<style scoped>
.calendar-container {
  position: relative;
  /* Ensure z-index context */
  z-index: 1; 
}

.event-popover {
  position: fixed; /* Fixed allows it to float over everything regardless of calendar scroll */
  z-index: 1000;
  width: 250px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  font-family: sans-serif;
  font-size: 0.9rem;
  pointer-events: auto;
}

.popover-header {
  margin-bottom: 4px;
  color: #333;
}

.popover-time {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 8px;
}

.popover-body {
  font-size: 0.85rem;
  color: #444;
  white-space: pre-wrap; /* Preserves line breaks from description */
  border-top: 1px solid #eee;
  padding-top: 8px;
}
</style>