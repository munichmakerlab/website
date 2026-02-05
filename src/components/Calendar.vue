<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import listPlugin from '@fullcalendar/list'

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
  eventDidMount: (info) => {
    // This adds a native 'hover' tooltip using the HTML title attribute
    if (info.event.title) {
      info.el.setAttribute('title', info.event.title);
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