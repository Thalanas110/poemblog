import { useState, useRef } from "react";
import { type Poem, uploadPoemImage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface PoemEditorProps {
  poem: Poem | null;
  onSave: (poem: Partial<Poem>) => void;
  onCancel: () => void;
  saving: boolean;
}

const PoemEditor = ({ poem, onSave, onCancel, saving }: PoemEditorProps) => {
  const [title, setTitle] = useState(poem?.title || "");
  const [content, setContent] = useState(poem?.content || "");
  const [author, setAuthor] = useState(poem?.author || "");
  const [excerpt, setExcerpt] = useState(poem?.excerpt || "");
  const [published, setPublished] = useState(poem?.published || false);
  const [imageUrl, setImageUrl] = useState(poem?.image_url || "");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadPoemImage(file);
      setImageUrl(url);
      toast.success("Image uploaded!");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content, author, excerpt: excerpt || null, image_url: imageUrl || null, published });
  };

  return (
    <div className="admin-shell min-h-screen bg-page">
      <div className="admin-shell-overlay min-h-screen">
        <header className="admin-topbar border-b border-amber-100/15">
          <div className="container mx-auto px-4 py-4 md:py-5 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="text-amber-100 hover:bg-slate-900/35"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-heading font-semibold text-amber-50 md:text-2xl">
              {poem ? "Edit Poem" : "New Poem"}
            </h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 md:py-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="admin-editor-panel rounded-2xl p-5 space-y-6 animate-fade-in md:p-8">
            <div>
              <Label className="font-ui text-sm text-amber-100/80">Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="admin-editor-input mt-1 font-heading text-lg"
                placeholder="The Road Not Taken..."
                required
              />
            </div>
            <div>
              <Label className="font-ui text-sm text-amber-100/80">Author</Label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="admin-editor-input mt-1 font-ui"
                placeholder="Anonymous"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="font-ui text-sm text-amber-100/80">
                Cover Image <span className="text-amber-100/60">(optional)</span>
              </Label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {imageUrl ? (
                <div className="mt-2 relative inline-block">
                  <img src={imageUrl} alt="Cover" className="w-full max-w-xs rounded-xl object-cover h-40 border border-amber-100/20" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => setImageUrl("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 font-ui gap-2 border-amber-100/30 bg-slate-900/25 text-amber-50 hover:bg-slate-900/45"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
              )}
            </div>

            <div>
              <Label className="font-ui text-sm text-amber-100/80">Poem Content</Label>
              <p className="text-xs text-amber-100/65 mb-2 font-ui">
                Write your poem with line breaks. Each line break will be preserved.
              </p>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck={false}
                className="admin-editor-input mt-1 font-body min-h-[260px] text-base md:min-h-[300px] leading-relaxed"
                placeholder={"Two roads diverged in a yellow wood,\nAnd sorry I could not travel both..."}
                required
              />
            </div>
            <div>
              <Label className="font-ui text-sm text-amber-100/80">
                Excerpt <span className="text-amber-100/60">(optional)</span>
              </Label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                spellCheck={false}
                className="admin-editor-input mt-1 font-body min-h-[80px]"
                placeholder="A short preview for the card..."
              />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-amber-100/15 bg-slate-950/20 px-3 py-2.5">
              <div>
                <Label className="font-ui text-sm text-amber-50">Publish</Label>
                <p className="text-xs text-amber-100/65 font-ui">
                  Make this poem visible to readers
                </p>
              </div>
              <Switch checked={published} onCheckedChange={setPublished} />
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="submit" disabled={saving || uploading} className="admin-primary-btn font-ui flex-1">
                {saving ? "Saving..." : poem ? "Update Poem" : "Create Poem"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="font-ui border-amber-100/30 bg-slate-900/25 text-amber-50 hover:bg-slate-900/45"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PoemEditor;
