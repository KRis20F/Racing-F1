import { Fragment } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  panelClassName?: string;
}

export const Dialog = ({ isOpen, onClose, title, description, children, actions, panelClassName }: DialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-[#111C44] p-6 text-left align-middle shadow-xl transition-all border border-purple-500/20 ${panelClassName || ''}`}>
                <HeadlessDialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-white mb-2"
                >
                  {title}
                </HeadlessDialog.Title>
                
                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      {description}
                    </p>
                  </div>
                )}

                {children && (
                  <div className="mt-4">
                    {children}
                  </div>
                )}

                {actions && (
                  <div className="mt-6 flex justify-end gap-3">
                    {actions}
                  </div>
                )}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}; 