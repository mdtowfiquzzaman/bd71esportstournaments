// app/lives/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'

const loadFacebookSDK = () => {
  return new Promise<void>((resolve) => {
    if (document.getElementById('facebook-jssdk')) {
      setTimeout(() => resolve(), 500)
      return
    }

    // @ts-expect-error Reason: Facebook SDK might not be loaded yet
    ;(window as unknown).fbAsyncInit = () => {
      resolve()
    }

    const script = document.createElement('script')
    script.id = 'facebook-jssdk'
    script.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v23.0'
    document.body.appendChild(script)
  })
}

export default function Lives() {
  const [liveUrl, setLiveUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchLive = async () => {
    try {
      const res = await fetch('/api/lives')
      const data = await res.json()

      if (data?.url) {
        setLiveUrl(data.url)
        await loadFacebookSDK()
        // @ts-expect-error Reason: Facebook SDK might not be loaded yet
        if (window.FB as unknown) window.FB.XFBML.parse()
      } else {
        // No live found — show fallback
        setLiveUrl('')
      }
    } catch (error) {
      console.error('Failed to fetch live URL:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLive()
  }, [])

  return (
    <div className="bg-[#18191D] text-white min-h-screen">
      <Header />
      <div className="container mx-auto min-h-[90vh] flex items-center justify-center p-4">
        {loading ? (
          <div className="text-gray-400 text-lg">Loading...</div>
        ) : liveUrl ? (
          <div className="w-full max-w-[800px] relative">
            

            {/* Facebook Video */}
            <div
              className="fb-video rounded"
              data-href={liveUrl}
              data-width="800"
              data-show-text="true"
              data-autoplay="true"
              data-allowfullscreen="true"
            ></div>

            {/* Like & Share */}
            <div className="mt-4 flex gap-4 items-center">
              <div
                className="fb-like"
                data-href={liveUrl}
                data-layout="button"
                data-action="like"
                data-size="large"
                data-share="true"
              ></div>
            </div>

            {/* Watch on Facebook Button */}
            <div className="mt-4 flex justify-center items-center">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition duration-200 mx-auto"
              >
                Watch on Facebook
              </a>
            </div>

            {/* Comments */}
            <div
              className="fb-comments mt-6"
              data-href={liveUrl}
              data-width="100%"
              data-numposts="5"
            ></div>
          </div>
        ) : (
          <div className="text-xl text-center text-gray-400">No stream running.</div>
        )}
      </div>
    </div>
  )
}
