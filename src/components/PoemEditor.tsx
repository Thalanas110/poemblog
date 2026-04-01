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
    <div className="min-h-screen bg-page">
      <div className="min-h-screen bg-background/80 backdrop-blur-sm">
        <header className="glass-panel border-b border-border/50">
          <div className="container mx-auto px-4 py-6 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-heading font-bold text-foreground">
              {poem ? "Edit Poem" : "New Poem"}
            </h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-8 space-y-6 animate-fade-in">
            <div>
              <Label className="font-ui text-sm text-muted-foreground">Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 bg-secondary border-border font-heading text-lg"
                placeholder="The Road Not Taken..."
                required
              />
            </div>
            <div>
              <Label className="font-ui text-sm text-muted-foreground">Author</Label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 bg-secondary border-border font-ui"
                placeholder="Anonymous"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="font-ui text-sm text-muted-foreground">
                Cover Image <span className="text-muted-foreground/60">(optional)</span>
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
                  <img src={imageUrl} alt="Cover" className="w-full max-w-xs rounded-md object-cover h-40" />
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
                  className="mt-2 font-ui gap-2"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
              )}
            </div>

            <div>
              <Label className="font-ui text-sm text-muted-foreground">Poem Content</Label>
              <p className="text-xs text-muted-foreground mb-2 font-ui">
                Write your poem with line breaks. Each line break will be preserved.
              </p>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 bg-secondary border-border font-body min-h-[300px] leading-relaxed"
                placeholder={"Two roads diverged in a yellow wood,\nAnd sorry I could not travel both..."}
                required
              />
            </div>
            <div>
              <Label className="font-ui text-sm text-muted-foreground">
                Excerpt <span className="text-muted-foreground/60">(optional)</span>
              </Label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mt-1 bg-secondary border-border font-body min-h-[80px]"
                placeholder="A short preview for the card..."
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-ui text-sm text-foreground">Publish</Label>
                <p className="text-xs text-muted-foreground font-ui">
                  Make this poem visible to readers
                </p>
              </div>
              <Switch checked={published} onCheckedChange={setPublished} />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={saving || uploading} className="font-ui flex-1">
                {saving ? "Saving..." : poem ? "Update Poem" : "Create Poem"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="font-ui">
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
