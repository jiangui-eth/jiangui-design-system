import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Search, X, Check, Plus, Minus, Edit2, Trash2, Copy, Download, Upload,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Menu, ArrowLeft, ArrowRight,
  AlertCircle, CheckCircle, XCircle, Info, Loader2,
  Eye, EyeOff, Calendar, Clock,
  User, Settings, LogOut,
} from './index'

const ALL_ICONS = [
  { name: 'Search',       Icon: Search },
  { name: 'X',           Icon: X },
  { name: 'Check',       Icon: Check },
  { name: 'Plus',        Icon: Plus },
  { name: 'Minus',       Icon: Minus },
  { name: 'Edit2',       Icon: Edit2 },
  { name: 'Trash2',      Icon: Trash2 },
  { name: 'Copy',        Icon: Copy },
  { name: 'Download',    Icon: Download },
  { name: 'Upload',      Icon: Upload },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'ChevronUp',   Icon: ChevronUp },
  { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'ChevronRight',Icon: ChevronRight },
  { name: 'Menu',        Icon: Menu },
  { name: 'ArrowLeft',   Icon: ArrowLeft },
  { name: 'ArrowRight',  Icon: ArrowRight },
  { name: 'AlertCircle', Icon: AlertCircle },
  { name: 'CheckCircle', Icon: CheckCircle },
  { name: 'XCircle',     Icon: XCircle },
  { name: 'Info',        Icon: Info },
  { name: 'Loader2',     Icon: Loader2 },
  { name: 'Eye',         Icon: Eye },
  { name: 'EyeOff',      Icon: EyeOff },
  { name: 'Calendar',    Icon: Calendar },
  { name: 'Clock',       Icon: Clock },
  { name: 'User',        Icon: User },
  { name: 'Settings',    Icon: Settings },
  { name: 'LogOut',      Icon: LogOut },
]

const meta: Meta = {
  title: 'Icons/Gallery',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1.5rem' }}>
      {ALL_ICONS.map(({ name, Icon }) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Icon size={24} />
          <span style={{ fontSize: '11px', color: '#666' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <Search size={16} />
      <Search size={20} />
      <Search size={24} />
      <Search size={32} />
    </div>
  ),
}
